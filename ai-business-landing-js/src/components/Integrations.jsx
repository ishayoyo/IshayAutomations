import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const integrations = [
  {
    name: 'React',
    icon: '/images/react-svgrepo-com.svg',
    category: 'Development',
  },
  {
    name: 'Node.js',
    icon: '/images/nodejs.svg',
    category: 'Development',
  },
  {
    name: 'Azure',
    icon: '/images/azure.svg',
    category: 'Cloud',
  },
  {
    name: 'AWS',
    icon: '/images/aws-svgrepo-com.svg',
    category: 'Cloud',
  },
  {
    name: 'GCP',
    icon: '/images/google-cloud-svgrepo-com.svg',
    category: 'Cloud',
  },
  {
    name: 'Telegram',
    icon: '/images/telegram.svg',
    category: 'Communication',
  },
  {
    name: 'WhatsApp',
    icon: '/images/whatsapp.svg',
    category: 'Communication',
  },
  {
    name: 'Slack',
    icon: '/images/slack.svg',
    category: 'Communication',
  },
  {
    name: 'OneDrive',
    icon: '/images/onedrive.svg',
    category: 'Storage',
  },
  {
    name: 'Google Drive',
    icon: '/images/gdrive.svg',
    category: 'Storage',
  },
  {
    name: 'Dropbox',
    icon: '/images/dropbox.svg',
    category: 'Storage',
  },
  {
    name: 'Gmail',
    icon: '/images/gmail.svg',
    category: 'Communication',
  },
  {
    name: 'Google Workspace',
    icon: '/images/google-workspace.svg',
    category: 'Productivity',
  },
  {
    name: 'GitHub',
    icon: '/images/github.svg',
    category: 'Development',
  },
  {
    name: 'Docker',
    icon: '/images/docker.svg',
    category: 'DevOps',
  },
  {
    name: 'Kubernetes',
    icon: '/images/kubernetes.svg',
    category: 'DevOps',
  },
  {
    name: 'MongoDB',
    icon: '/images/mongodb.svg',
    category: 'Database',
  },
  {
    name: 'Salesforce',
    icon: '/images/salesforce.svg',
    category: 'CRM',
  },
  {
    name: 'Stripe',
    icon: '/images/stripe.svg',
    category: 'Payment',
  },
  {
    name: 'OpenAI',
    icon: '/images/openai.svg',
    category: 'AI',
  },
  {
    name: 'Claude AI',
    icon: '/images/claude.svg',
    category: 'AI',
  },
  {
    name: 'Google Gemini',
    icon: '/images/gemini.svg',
    category: 'AI',
  },
  {
    name: 'PyTorch',
    icon: '/images/pytorch.svg',
    category: 'AI',
  },
  {
    name: 'TensorFlow',
    icon: '/images/tensorflow.svg',
    category: 'AI',
  }
]

const colors = [
  '#4285f4', // Google Blue
  '#00a1e0', // Salesforce Blue
  '#2496ed', // Docker Blue
  '#326ce5', // Kubernetes Blue
  '#47A248', // MongoDB Green
  '#e01e5a', // Slack Pink
  '#ffd04b', // Yellow
  '#ff4f64', // Red
  '#7b61ff', // Purple
  '#00c4b4', // Teal
  '#61DAFB', // React Blue
]

const Integrations = () => {
  const canvasRef = useRef()
  const [activeFlows, setActiveFlows] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let points = {}
    let time = 0
    let activeConnections = new Set()

    const initPoints = () => {
      const logos = document.querySelectorAll('.integration-logo')
      logos.forEach((logo) => {
        const rect = logo.getBoundingClientRect()
        const canvasRect = canvas.getBoundingClientRect()
        points[logo.dataset.name] = {
          x: rect.left - canvasRect.left + rect.width / 2,
          y: rect.top - canvasRect.top + rect.height / 2
        }
      })
    }

    // Start animations immediately
    const startAnimations = () => {
      initPoints()
      generateConnections()
      animate()
    }

    const generateConnections = () => {
      const services = Object.keys(points)
      const newConnections = new Set()
      const oldConnections = activeConnections
      
      services.forEach(service => {
        const connectionCount = 3 + Math.floor(Math.random())
        const availableServices = services.filter(s => s !== service && !newConnections.has(`${s}-${service}`))
        
        const existingConnections = Array.from(oldConnections)
          .filter(conn => conn.includes(service))
          .slice(0, 2)

        existingConnections.forEach(conn => {
          newConnections.add(conn)
        })
        
        const remainingCount = connectionCount - existingConnections.length
        for (let i = 0; i < remainingCount && availableServices.length > 0; i++) {
          const targetIndex = Math.floor(Math.random() * availableServices.length)
          const target = availableServices[targetIndex]
          newConnections.add(`${service}-${target}`)
          availableServices.splice(targetIndex, 1)
        }
      })
      
      activeConnections = newConnections
    }

    const drawConnections = () => {
      if (!ctx || !canvas) return
      time += 0.003 // Even slower time progression for smoother animation

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw all active connections
      Array.from(activeConnections).forEach(connection => {
        const [from, to] = connection.split('-')
        const start = points[from]
        const end = points[to]
        
        if (!start || !end) return

        const dx = end.x - start.x
        const dy = end.y - start.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < canvas.width) {
          const midX = (start.x + end.x) / 2
          const midY = (start.y + end.y) / 2

          // Create unique but consistent color for this connection
          const colorIndex = (from.charCodeAt(0) + to.charCodeAt(0)) % colors.length
          const baseColor = colors[colorIndex]

          // Draw subtle connection line with increased width
          ctx.beginPath()
          ctx.strokeStyle = baseColor + '15' // Slightly more visible base line
          ctx.lineWidth = 0.8
          
          // Create organic curved path with smoother movement
          const offset = Math.sin(time + from.charCodeAt(0) * 0.05) * 20
          const controlPoint1X = start.x + dx * 0.25
          const controlPoint1Y = start.y + dy * 0.25 + offset
          const controlPoint2X = start.x + dx * 0.75
          const controlPoint2Y = start.y + dy * 0.75 - offset

          ctx.moveTo(start.x, start.y)
          ctx.bezierCurveTo(
            controlPoint1X, controlPoint1Y,
            controlPoint2X, controlPoint2Y,
            end.x, end.y
          )
          ctx.stroke()

          // Draw flowing particles with more particles and longer trails
          const particleCount = 3 // Increased from 2
          for (let i = 0; i < particleCount; i++) {
            const t = ((time * 0.2) + i / particleCount) % 1 // Slower particle movement
            
            // Bezier curve point calculation
            const u = 1 - t
            const tt = t * t
            const uu = u * u
            const uuu = uu * u
            const ttt = tt * t
            
            const x = uuu * start.x +
                     3 * uu * t * controlPoint1X +
                     3 * u * tt * controlPoint2X +
                     ttt * end.x
                     
            const y = uuu * start.y +
                     3 * uu * t * controlPoint1Y +
                     3 * u * tt * controlPoint2Y +
                     ttt * end.y

            // Draw larger particle
            ctx.beginPath()
            ctx.fillStyle = baseColor + 'ee' // More opaque particles
            ctx.arc(x, y, 1.2, 0, Math.PI * 2)
            ctx.fill()

            // Draw longer particle trail
            const trailLength = 8 // Increased from 5
            for (let j = 1; j <= trailLength; j++) {
              const trailT = Math.max(0, t - j * 0.008) // Longer trail segments
              const u = 1 - trailT
              const tt = trailT * trailT
              const uu = u * u
              const uuu = uu * u
              const ttt = tt * trailT
              
              const trailX = uuu * start.x +
                            3 * uu * trailT * controlPoint1X +
                            3 * u * tt * controlPoint2X +
                            ttt * end.x
                            
              const trailY = uuu * start.y +
                            3 * uu * trailT * controlPoint1Y +
                            3 * u * tt * controlPoint2Y +
                            ttt * end.y

              ctx.beginPath()
              ctx.fillStyle = baseColor + (50 - j * 5).toString(16) // Slower fade for trail
              ctx.arc(trailX, trailY, 1 - j * 0.08, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      })
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

    // Initialize canvas size and start animations immediately
    handleResize()
    // Shorter delay for initial animation
    setTimeout(startAnimations, 100)

    const connectionInterval = setInterval(generateConnections, 12000)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      clearInterval(connectionInterval)
    }
  }, [])

  return (
    <section id="integrations" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none', opacity: 0.8 }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="heading-lg mb-4">
              <span className="gradient-text-enhanced">System Integrations</span>
            </h2>
            <p className="text-base md:text-xl text-white/80 max-w-3xl mx-auto">
              Seamlessly connecting and automating your technology ecosystem
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-6 max-w-6xl mx-auto">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="integration-logo relative"
              data-name={integration.name}
            >
              <div className="card-sm group">
                <div className="relative h-12 md:h-16 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-400/5 to-secondary-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-8 h-8 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <p className="text-center text-[10px] md:text-sm mt-1 md:mt-2 text-white/70 truncate px-1">
                  {integration.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Integrations 