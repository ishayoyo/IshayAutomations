import { useRef, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { BufferGeometry, PointsMaterial, Vector3, DoubleSide } from 'three'
import * as THREE from 'three'

const ParticleField = () => {
  const count = 2000
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = Math.random() * 5
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    // Spherical distribution
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Random velocities for fluid movement
    velocities[i3] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.02

    // Gradient colors from blue to purple
    const mixFactor = Math.random()
    colors[i3] = 0.4 + mixFactor * 0.2     // R: subtle variation
    colors[i3 + 1] = 0.5 + mixFactor * 0.3  // G: more variation
    colors[i3 + 2] = 0.8 + mixFactor * 0.2  // B: strong blue base
  }

  const geometry = useRef<BufferGeometry>(null!)
  const material = useRef<PointsMaterial>(null!)
  const points = useRef<THREE.Points>(null!)

  useFrame(() => {
    if (geometry.current) {
      const positions = geometry.current.attributes.position.array as Float32Array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update positions with velocities
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]

        // Boundary check and bounce
        for (let j = 0; j < 3; j++) {
          const idx = i3 + j
          if (Math.abs(positions[idx]) > 5) {
            velocities[idx] *= -1
          }
        }
      }

      geometry.current.attributes.position.needsUpdate = true
    }
  })

  useEffect(() => {
    return () => {
      if (geometry.current) {
        geometry.current.dispose()
      }
      if (material.current) {
        material.current.dispose()
      }
    }
  }, [])

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          usage={THREE.StaticDrawUsage}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null!)
  const sphereRef2 = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1
    }
    if (sphereRef2.current) {
      sphereRef2.current.rotation.y = -time * 0.15
    }
  })

  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={sphereRef} args={[1.2, 48, 48]}>
        <meshPhongMaterial
          color="#3B82F6"  // secondary-500 from theme
          transparent
          opacity={0.08}
          wireframe
          side={DoubleSide}
        />
      </Sphere>

      {/* Inner sphere */}
      <Sphere ref={sphereRef2} args={[1.1, 32, 32]}>
        <meshPhongMaterial
          color="#F43F5E"  // accent-500 from theme
          transparent
          opacity={0.06}
          wireframe
          side={DoubleSide}
        />
      </Sphere>
    </group>
  )
}

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const words = "Transform Your Business with AI".split(" ")

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-900 via-primary-900/95 to-primary-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Animation Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
          gl={{ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.3} />
          <directionalLight position={[-5, -5, -5]} intensity={0.2} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <AnimatedSphere />
          <ParticleField />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 space-y-6">
            <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="heading-xl text-white font-extrabold drop-shadow-glow inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              className="body-lg max-w-2xl mx-auto text-white/80 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              Harness the power of artificial intelligence to streamline your operations
              and unlock new opportunities for growth.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <motion.button
              className="btn-primary min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="btn-outline min-w-[200px]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="scroll-indicator flex justify-center p-2">
          <motion.div
            className="w-1 h-1 rounded-full bg-white/40"
            animate={{
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Hero 