"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Environment, PerspectiveCamera, Text } from '@react-three/drei'

function CreditCard(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <group
      ref={meshRef}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.37, 2.13, 0.06]} />
        <meshStandardMaterial color={hovered ? "#ff69b4" : "#1e90ff"} />
      </mesh>

      {/* Chip */}
      <mesh position={[-1, 0.5, 0.031]}>
        <boxGeometry args={[0.7, 0.7, 0.01]} />
        <meshStandardMaterial color="gold" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Magnetic strip */}
      <mesh position={[0, -0.9, 0.031]}>
        <boxGeometry args={[3.2, 0.4, 0.01]} />
        <meshStandardMaterial color="#1c1c1c" />
      </mesh>

      {/* Card number */}
      <Text
        position={[-0.2, 0, 0.031]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        1234 5678 9012 3456
      </Text>

      {/* Cardholder name */}
      <Text
        position={[-1.5, -0.4, 0.031]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        JOHN DOE
      </Text>

      {/* Expiration date */}
      <Text
        position={[0.8, -0.4, 0.031]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        VALID THRU: 12/25
      </Text>

      {/* Card issuer logo */}
      <mesh position={[1.4, 0.8, 0.031]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

export function SpinningCreditCardComponent() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <CreditCard />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}