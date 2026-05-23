"use client"

import { Float, OrbitControls, Sphere } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useReducedMotion } from "framer-motion"
import { useMemo, useRef } from "react"
import * as THREE from "three"

// Define the orbit providers with brand colors
const providers = [
  { name: "ChatGPT", color: "#10A37F", radius: 3.5, speed: 0.5, size: 0.3 },
  { name: "Claude", color: "#D4A574", radius: 4.5, speed: 0.4, size: 0.35 },
  { name: "Gemini", color: "#4285F4", radius: 5.5, speed: 0.3, size: 0.3 },
  { name: "Perplexity", color: "#20808D", radius: 6.5, speed: 0.25, size: 0.25 },
  { name: "Cursor", color: "#F472B6", radius: 3.8, speed: 0.45, size: 0.25 },
]

function OrbitNode({
  color,
  radius,
  speed,
  size,
  offset,
}: {
  color: string
  radius: number
  speed: number
  size: number
  offset: number
}) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime() * speed + offset
    // Circular orbit
    groupRef.current.position.x = Math.cos(t) * radius
    groupRef.current.position.z = Math.sin(t) * radius
    // Add subtle up/down bobbing
    groupRef.current.position.y = Math.sin(t * 2) * 0.5
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* The node sphere */}
        <Sphere args={[size, 32, 32]}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </Sphere>
      </Float>
      {/* Subtle point light following the node */}
      <pointLight color={color} intensity={0.5} distance={3} />
    </group>
  )
}

function OrbitPath({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
    }
    return pts
  }, [radius])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
          count={points.length}
          array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.05} />
    </line>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#8B5CF6" />

      {/* Center Core (Ailectra) */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#6D28D9"
            emissiveIntensity={1}
            roughness={0.2}
            metalness={0.8}
            wireframe={true}
            transparent
            opacity={0.8}
          />
        </Sphere>
        {/* Core inner glow */}
        <Sphere args={[0.8, 32, 32]}>
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.5} />
        </Sphere>
      </Float>

      {/* Orbit paths and nodes */}
      {providers.map((p, i) => (
        <group key={p.name} rotation-x={Math.PI / 8 * (i % 2 === 0 ? 1 : -1)}>
          <OrbitPath radius={p.radius} />
          <OrbitNode
            color={p.color}
            radius={p.radius}
            speed={p.speed}
            size={p.size}
            offset={i * (Math.PI * 2) / providers.length}
          />
        </group>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
    </>
  )
}

export function ThreeAIOrbit() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    // If user prefers reduced motion, we return a null canvas to skip 3D rendering
    // The fallback in the parent component will take over
    return null
  }

  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 4, 12], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
