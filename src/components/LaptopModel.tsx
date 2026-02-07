import { useRef, useEffect, useState, createContext, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Outline } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Gecko (Firefox, Zen Browser, etc.) suele tener peor rendimiento en WebGL/post-processing.
// Solo evaluar en cliente (SSR no tiene window/navigator).
const isGecko =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  !('chrome' in window) &&
  /Gecko\//i.test(navigator.userAgent);

const VisibilityContext = createContext({ isHeroVisible: true });

/**
 * frameloop="demand": solo dibujamos cuando el Hero está visible (C).
 * En Gecko limitamos a ~30fps (B) para dar margen al scroll.
 */
function DemandLoopDriver() {
  const { isHeroVisible } = useContext(VisibilityContext);
  const { invalidate } = useThree();
  const lastInvoke = useRef(0);
  const FPS_Gecko = 60;

  useEffect(() => {
    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!isHeroVisible) return;
      const now = performance.now();
      if (isGecko && now - lastInvoke.current < 1000 / FPS_Gecko) return;
      lastInvoke.current = now;
      invalidate();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isHeroVisible, invalidate]);

  return null;
}

const MOBILE_BREAKPOINT = 768;

/** Ease-out cubic: rápida al inicio, desacelera suavemente */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const INTRO_DURATION = 1.4;   // segundos totales de la animación
const INTRO_DELAY = 0.15;     // pequeña espera antes de comenzar

function Laptop({
  onMeshesReady,
  isMobile
}: {
  onMeshesReady?: (meshes: THREE.Mesh[]) => void;
  isMobile: boolean;
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/models/laptop-modded.glb');
  const introElapsed = useRef(0);
  const introComplete = useRef(false);

  const targetScale = isMobile ? 2.2 : 3.8;
  /* Un poco más abajo para que la parte de arriba tenga margen y no se corte al rotar */
  const targetY = isMobile ? -0.35 : -0.75;

  useEffect(() => {
    if (gltf.scene) {
      const meshes: THREE.Mesh[] = [];
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          meshes.push(mesh);
          if (mesh.material) {
            const material = (mesh.material as THREE.MeshStandardMaterial).clone();
            material.emissive = new THREE.Color(0x000000);
            material.emissiveIntensity = 0;
            // Empieza transparente para la animación de entrada
            material.transparent = true;
            material.opacity = 0;
            mesh.material = material;
          }
        }
      });
      onMeshesReady?.(meshes);
    }
  }, [gltf, onMeshesReady]);

  useFrame((state, delta) => {
    if (!laptopRef.current) return;

    // --- Animación de entrada ---
    if (!introComplete.current) {
      introElapsed.current += delta;
      const raw = Math.max(0, (introElapsed.current - INTRO_DELAY) / INTRO_DURATION);
      const t = easeOutCubic(Math.min(raw, 1));

      // Escala: de 88% a 100%
      const s = targetScale * (0.88 + 0.12 * t);
      laptopRef.current.scale.setScalar(s);

      // Posición Y: sube ligeramente hasta su lugar final
      laptopRef.current.position.y = targetY + (1 - t) * 0.25;

      // Opacidad de cada material
      laptopRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          mat.opacity = t;
        }
      });

      // Al terminar: desactivar transparencia para mejor rendimiento
      if (raw >= 1) {
        introComplete.current = true;
        laptopRef.current.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            mat.transparent = false;
            mat.opacity = 1;
          }
        });
      }
    }

    // Auto-rotate the laptop gently
    laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
  });

  return (
    <primitive
      ref={laptopRef}
      object={gltf.scene}
      scale={targetScale * 0.88}
      position={[0, targetY + 0.25, 0]}
      rotation={[0.1, 0, 0]}
    />
  );
}

export default function LaptopModel() {
  const [laptopMeshes, setLaptopMeshes] = useState<THREE.Mesh[]>([]);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Ajustar escala/posición en móvil para que el modelo quepa entero
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // C: no renderizar cuando el Hero no está en viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      { root: null, rootMargin: '0px', threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <VisibilityContext.Provider value={{ isHeroVisible }}>
      <div
        ref={containerRef}
        className="laptop-container"
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
      >
        <Canvas
          style={{ background: 'transparent' }}
          dpr={isGecko ? 1 : [1, 2]}
          frameloop="demand"
          gl={{
            antialias: !isGecko,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15
          }}
        >
          <DemandLoopDriver />
          <PerspectiveCamera
            makeDefault
            position={[0, 0, isMobile ? 5.5 : 5]}
            fov={isMobile ? 55 : 50}
          />
        
        {/* Environment: reflejos realistas en metal/plástico (sin background para mantener transparencia) */}
        <Environment preset="night" environmentIntensity={0.6} background={false} />

        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[4, 6, 4]}
          angle={0.4}
          penumbra={1}
          intensity={1.8}
        />
        <pointLight position={[0, 4, 0]} intensity={0.6} color="#ffffff" />
        {/* Rim light púrpura detrás: separa el modelo del fondo */}
        <pointLight
          position={[0, 0, -3]}
          intensity={6}
          color="#8b5cf6"
          distance={10}
          decay={1.2}
        />
        {/* Rim lateral suave para definir el borde */}
        <pointLight position={[-2, 0.5, 1]} intensity={0.8} color="#a78bfa" />
        <pointLight position={[2, 0.5, 1]} intensity={0.8} color="#a78bfa" />

        <Laptop onMeshesReady={setLaptopMeshes} isMobile={isMobile} />

          {/* Solo rotación horizontal: polar fijado; azimuth sin límite = vuelta completa */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
          minAzimuthAngle={-Infinity}
          maxAzimuthAngle={Infinity}
          enableDamping
          dampingFactor={0.05}
        />
        
        {/* Post-processing: en Gecko (Firefox/Zen) es muy costoso; usamos solo Bloom suave o nada */}
        {!isGecko && (
          <EffectComposer>
            <Outline
              selection={laptopMeshes}
              visibleEdgeColor={0x8b5cf6}
              hiddenEdgeColor={0x8b5cf6}
              edgeStrength={25}
              blendFunction={BlendFunction.ALPHA}
              blur={true}
              kernelSize={5}
              xRay={true}
            />
            <Bloom
              luminanceThreshold={0.3}
              luminanceSmoothing={0.9}
              intensity={1.8}
              radius={0.9}
            />
          </EffectComposer>
        )}
        {isGecko && (
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.4}
              luminanceSmoothing={0.9}
              intensity={1}
              radius={0.4}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
    </VisibilityContext.Provider>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/laptop-modded.glb');
