import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const integrations = [
  {
    name: 'AWS',
    icon: '/images/aws.svg',
    category: 'Cloud',
  },
  {
    name: 'Google Cloud',
    icon: '/images/gcp.svg',
    category: 'Cloud',
  },
  {
    name: 'Azure',
    icon: '/images/azure.svg',
    category: 'Cloud',
  },
  {
    name: 'TensorFlow',
    icon: '/images/tensorflow.svg',
    category: 'ML',
  },
  {
    name: 'PyTorch',
    icon: '/images/pytorch.svg',
    category: 'ML',
  },
  {
    name: 'Kubernetes',
    icon: '/images/kubernetes.svg',
    category: 'DevOps',
  },
  {
    name: 'Docker',
    icon: '/images/docker.svg',
    category: 'DevOps',
  },
  {
    name: 'GitHub',
    icon: '/images/github.svg',
    category: 'DevOps',
  },
]

const Integrations = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let points = []

    const initPoints = () => {
      const logos = document.querySelectorAll('.integration-logo')
      points = Array.from(logos).map((logo) => {
        const rect = logo.getBoundingClientRect()
        const canvasRect = canvas.getBoundingClientRect()
        return {
          x: rect.left - canvasRect.left + rect.width / 2,
          y: rect.top - canvasRect.top + rect.height / 2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        }
      })
    }

    const drawConnections = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create gradient for lines
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(108, 43, 217, 0.3)')  // accent-400 with opacity
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)')  // secondary-400 with opacity
      
      ctx.strokeStyle = gradient
      ctx.lineWidth = 0.5

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[j].x - points[i].x
          const dy = points[j].y - points[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200) {
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.globalAlpha = 1 - distance / 200
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      drawConnections()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initPoints()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section id="integrations" className="py-24 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 space-y-4"
        >
          <motion.div 
            className="text-accent-400 uppercase tracking-widest text-sm font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Technology Stack
          </motion.div>
          
          <motion.h2
            className="heading-lg gradient-text-enhanced mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Seamless Integrations
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Our platform integrates with the leading tools and services in the industry
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="integration-logo"
            >
              <div className="card group hover:border-accent-400/50 transition-all duration-300">
                <div className="relative h-32 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-secondary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-16 h-16 object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <p className="text-center mt-4 text-white/70 group-hover:text-accent-300 transition-colors duration-300">
                  {integration.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-20"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Integrations
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Integrations 