import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const AnimatedSphere = () => {
  const sphereRef = useRef()
  const { width } = useWindowSize()
  const sphereSize = width < 768 ? 2.5 : 4 // Smaller sphere on mobile

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.1
    }
  })

  return (
    <Sphere ref={sphereRef} args={[sphereSize, 64, 64]}>
      <meshPhongMaterial
        color="#60a5fa"
        wireframe
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </Sphere>
  )
}

const ParticleField = () => {
  const count = 4000
  const { width } = useWindowSize()
  const sphereSize = width < 768 ? 2.5 : 4
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const radius = sphereSize + Math.random() * 0.8 // Keep particles near sphere surface
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    // Spherical distribution
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i3 + 2] = radius * Math.cos(phi)

    // Random velocities for fluid movement
    velocities[i3] = (Math.random() - 0.5) * 0.015
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.015
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.015

    // Gradient colors from blue to purple
    const mixFactor = Math.random()
    colors[i3] = 0.4 + mixFactor * 0.2     // R: subtle variation
    colors[i3 + 1] = 0.5 + mixFactor * 0.3  // G: more variation
    colors[i3 + 2] = 0.8 + mixFactor * 0.2  // B: strong blue base
  }

  const geometry = useRef()
  const material = useRef()
  const points = useRef()

  useFrame(() => {
    if (geometry.current) {
      const positions = geometry.current.attributes.position.array
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        
        // Update positions with velocities
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]

        // Keep particles within sphere bounds
        const x = positions[i3]
        const y = positions[i3 + 1]
        const z = positions[i3 + 2]
        const distance = Math.sqrt(x * x + y * y + z * z)
        
        const maxRadius = sphereSize + 0.8
        const minRadius = sphereSize - 0.8
        
        if (distance > maxRadius || distance < minRadius) {
          const scale = (distance > maxRadius ? maxRadius : minRadius) / distance
          positions[i3] *= scale
          positions[i3 + 1] *= scale
          positions[i3 + 2] *= scale
          
          velocities[i3] *= -1
          velocities[i3 + 1] *= -1
          velocities[i3 + 2] *= -1
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
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        vertexColors
        size={0.04}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const Hero = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const { width } = useWindowSize()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      {/* 3D Canvas - Now positioned absolutely and centered */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, width < 768 ? 8 : 12], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <group>
            <AnimatedSphere />
            <ParticleField />
          </group>
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ y }}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-6"
              >
                <span className="gradient-text-enhanced">
                  AstronAI
                </span>
                <span className="text-white/90"> by Almuly Ishay</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-white/90 max-w-2xl mb-8"
              >
                Revolutionizing business automation through advanced AI integration. 
                Seamlessly connect your tools and workflows for enhanced productivity 
                and intelligent decision-making.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="btn-primary px-8 py-4 text-lg"
                >
                  Get Started
                </a>
                <a
                  href="#features"
                  className="btn-secondary px-8 py-4 text-lg"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          className="w-6 h-6 text-white/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  )
}

export default Hero 