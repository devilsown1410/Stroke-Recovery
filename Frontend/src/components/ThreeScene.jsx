import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, Environment, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'

// Floating 3D objects component
const FloatingObjects = () => {
  const { viewport } = useThree()
  const group = useRef()
  
  // Create simple geometric shapes
  const shapes = [
    { geometry: new THREE.SphereGeometry(1, 32, 32), position: [3, 0, 0], color: '#6366f1' },
    { geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5), position: [-3, 2, -2], color: '#14b8a6' },
    { geometry: new THREE.ConeGeometry(1, 2, 32), position: [0, -3, -1], color: '#f43f5e' },
    { geometry: new THREE.TorusGeometry(1, 0.3, 16, 32), position: [-4, -2, 0], color: '#facc15' },
    { geometry: new THREE.DodecahedronGeometry(1), position: [4, 3, -2], color: '#8b5cf6' },
  ]
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })
  
  return (
    <group ref={group}>
      {shapes.map((shape, index) => (
        <Float key={index} speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <mesh 
            geometry={shape.geometry} 
            position={shape.position}
            scale={viewport.width > 5 ? 0.6 : 0.4}
          >
            <meshStandardMaterial 
              color={shape.color} 
              roughness={0.3} 
              metalness={0.2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Main ThreeScene component
const ThreeScene = ({ style }) => {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <FloatingObjects />
        </PresentationControls>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default ThreeScene