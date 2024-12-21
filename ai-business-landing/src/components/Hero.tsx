import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { BufferGeometry, PointsMaterial } from 'three'
import * as THREE from 'three'

const ParticleField = () => {
  const count = 2500
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = (Math.random() - 0.5) * 10
    positions[i3 + 2] = (Math.random() - 0.5) * 10

    colors[i3] = Math.random() * 0.3 + 0.7
    colors[i3 + 1] = Math.random() * 0.2 + 0.8
    colors[i3 + 2] = Math.random() * 0.1 + 0.9
  }

  const geometry = useRef<BufferGeometry>(null!)
  const material = useRef<PointsMaterial>(null!)

  return (
    <points>
      <bufferGeometry ref={geometry}>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          usage={THREE.StaticDrawUsage}
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
        size={0.025}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

const AnimatedSphere = () => {
  return (
    <Sphere args={[1, 64, 64]}>
      <meshBasicMaterial wireframe color="rgba(99, 102, 241, 0.3)" opacity={0.3} transparent />
    </Sphere>
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 3D Animation Background */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
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
          transition={{ duration: 0.8 }}
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
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              className="body-lg max-w-2xl mx-auto text-white/90 text-lg drop-shadow-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Harness the power of artificial intelligence to revolutionize your
              business operations and drive unprecedented growth.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="btn-primary min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="btn-outline min-w-[200px]"
              whileHover={{ scale: 1.05 }}
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
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="scroll-indicator flex justify-center p-2">
          <motion.div
            className="w-1 h-1 rounded-full bg-primary-100"
            animate={{
              y: [0, 16, 0],
            }}
            transition={{
              duration: 1.5,
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