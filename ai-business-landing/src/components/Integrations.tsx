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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let points: { x: number; y: number; vx: number; vy: number }[] = []

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
      ctx.strokeStyle = '#6C2BD9'
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
    <section id="integrations" className="py-20 bg-dark-light relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Seamless Integrations</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Our platform integrates with the tools and services you already use.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="integration-logo"
            >
              <div className="bg-dark rounded-lg p-6 h-32 flex items-center justify-center group hover:bg-dark-lighter transition-colors">
                <img
                  src={integration.icon}
                  alt={integration.name}
                  className="w-16 h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <p className="text-center mt-4 text-gray-400 group-hover:text-white transition-colors">
                {integration.name}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View All Integrations
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Integrations 