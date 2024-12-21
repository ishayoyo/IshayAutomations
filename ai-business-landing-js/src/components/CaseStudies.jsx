import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const caseStudies = [
  {
    title: 'LavetachHub Email Intelligence',
    company: 'Client Management System',
    description:
      'Developed an intelligent email management system that automatically processes, categorizes, and stores client communications. The system integrates with Gmail and OneDrive, featuring OpenAI-powered call transcription and smart client matching.',
    stats: [
      { label: 'Email Processing Time', value: '-85%' },
      { label: 'File Organization', value: '100%' },
      { label: 'Client Match Rate', value: '99.8%' },
    ],
    features: [
      'Automated client email matching',
      'Smart attachment organization',
      'AI-powered call transcription',
      'Unknown email client matching',
      'Centralized client management'
    ],
    image: '/images/lavetech.jpg',
  },
  {
    title: 'SaverSonic Social Platform',
    company: 'AI-Powered Deal Network',
    description:
      'Built a comprehensive social network platform that leverages AI to enhance deal discovery and user engagement. The system analyzes user behavior to provide personalized deal recommendations and improve community interaction.',
    stats: [
      { label: 'User Engagement', value: '+240%' },
      { label: 'Deal Discovery', value: '+180%' },
      { label: 'User Retention', value: '95%' },
    ],
    features: [
      'AI deal recommendation engine',
      'User behavior analysis',
      'Social networking features',
      'Personalized content delivery',
      'Community engagement tools'
    ],
    image: '/images/saversonic.jpg',
  },
  {
    title: 'SpicyVape E-commerce',
    company: 'WooCommerce Enhancement',
    description:
      'Implemented advanced order processing and fraud detection systems for a WooCommerce platform, significantly reducing manual processing time and fraudulent transactions while improving order accuracy.',
    stats: [
      { label: 'Fraud Reduction', value: '-92%' },
      { label: 'Processing Time', value: '-75%' },
      { label: 'Order Accuracy', value: '99.9%' },
    ],
    features: [
      'Automated order processing',
      'AI fraud detection',
      'Order streamlining',
      'Real-time verification',
      'Performance optimization'
    ],
    image: '/images/spicyvape.jpg',
  },
]

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0)

  const paginate = useCallback((newDirection) => {
    if (isAnimating) return
    
    setIsAnimating(true)
    setDirection(newDirection)
    const newIndex = (currentIndex + newDirection + caseStudies.length) % caseStudies.length
    setCurrentIndex(newIndex)
    
    setTimeout(() => setIsAnimating(false), 500)
  }, [currentIndex, isAnimating])

  const handleDotClick = useCallback((index) => {
    if (isAnimating || index === currentIndex) return
    
    setIsAnimating(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    
    setTimeout(() => setIsAnimating(false), 500)
  }, [currentIndex, isAnimating])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
      }
    }),
  }

  const automationVariants = {
    initial: { width: 0 },
    animate: { 
      width: '100%',
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    }
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
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
            Client Success Stories
          </motion.div>
          
          <motion.h2
            className="heading-lg gradient-text-enhanced mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Transforming Businesses with AI
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            See how our AI solutions have revolutionized operations and driven growth across industries
          </motion.p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="relative">
            <AnimatePresence
              initial={false}
              mode="wait"
              custom={direction}
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <div className="card group hover:border-accent-400/50 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="text-3xl font-bold text-white group-hover:text-accent-300 transition-colors duration-300">
                          {caseStudies[currentIndex].title}
                        </h3>
                        <p className="text-xl text-accent-400">
                          {caseStudies[currentIndex].company}
                        </p>
                        <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          {caseStudies[currentIndex].description}
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-3 gap-6">
                        {caseStudies[currentIndex].stats.map((stat, index) => (
                          <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="card group/stat relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute bottom-0 left-0 h-1 bg-accent-400"
                              variants={automationVariants}
                              initial="initial"
                              animate="animate"
                              key={`progress-${currentIndex}-${index}`}
                            />
                            
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                              <div className="text-2xl font-bold text-white group-hover/stat:text-accent-300 transition-colors duration-300">
                                {stat.value}
                              </div>
                              <div className="text-sm text-white/70 group-hover/stat:text-white/90 transition-colors duration-300">
                                {stat.label}
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="mt-8 space-y-4">
                        <h4 className="text-xl font-semibold text-accent-400">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-4">
                          {caseStudies[currentIndex].features.map((feature, index) => (
                            <motion.li
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-2 text-white/70"
                            >
                              <svg 
                                className="w-5 h-5 text-accent-400" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={2} 
                                  d="M5 13l4 4L19 7" 
                                />
                              </svg>
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <motion.div 
                      className="relative rounded-lg overflow-hidden h-[500px] flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 mix-blend-overlay" />
                      <motion.img
                        src={caseStudies[currentIndex].image}
                        alt={caseStudies[currentIndex].title}
                        className="w-[90%] h-[90%] object-contain filter drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                        style={{
                          filter: 'drop-shadow(0 0 15px rgba(129, 140, 248, 0.3))',
                          WebkitFilter: 'drop-shadow(0 0 15px rgba(129, 140, 248, 0.3))'
                        }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Repositioned Navigation Controls */}
          <div className="mt-8 flex items-center justify-center space-x-8">
            <motion.button
              className={`group p-3 rounded-full bg-primary-800/20 backdrop-blur-sm 
                border-2 border-accent-400/20 hover:border-accent-400/50
                text-accent-400/50 hover:text-accent-400 
                transition-all duration-300 ease-out
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-glow'}`}
              whileHover={!isAnimating ? { 
                scale: 1.05,
                backgroundColor: 'rgba(var(--color-primary-800), 0.3)',
              } : {}}
              whileTap={!isAnimating ? { scale: 0.95 } : {}}
              onClick={() => !isAnimating && paginate(-1)}
              disabled={isAnimating}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ x: -2 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 19l-7-7 7-7" 
                  />
                </svg>
              </motion.div>
            </motion.button>

            {/* Progress Indicators */}
            <div className="flex space-x-2">
              {caseStudies.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isAnimating}
                  className={`h-1.5 rounded-full transition-all duration-300 
                    ${index === currentIndex 
                      ? 'w-6 bg-accent-400' 
                      : 'w-1.5 bg-accent-400/30 hover:bg-accent-400/50'
                    } ${isAnimating ? 'cursor-not-allowed' : ''}`}
                  whileHover={!isAnimating ? { scale: 1.1 } : {}}
                  whileTap={!isAnimating ? { scale: 0.95 } : {}}
                />
              ))}
            </div>

            <motion.button
              className={`group p-3 rounded-full bg-primary-800/20 backdrop-blur-sm 
                border-2 border-accent-400/20 hover:border-accent-400/50
                text-accent-400/50 hover:text-accent-400 
                transition-all duration-300 ease-out
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-glow'}`}
              whileHover={!isAnimating ? { 
                scale: 1.05,
                backgroundColor: 'rgba(var(--color-primary-800), 0.3)',
              } : {}}
              whileTap={!isAnimating ? { scale: 0.95 } : {}}
              onClick={() => !isAnimating && paginate(1)}
              disabled={isAnimating}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ x: 2 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 