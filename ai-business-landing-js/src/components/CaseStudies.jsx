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
    
    setTimeout(() => setIsAnimating(false), 300)
  }, [currentIndex, isAnimating])

  const handleDotClick = useCallback((index) => {
    if (isAnimating || index === currentIndex) return
    
    setIsAnimating(true)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
    
    setTimeout(() => setIsAnimating(false), 300)
  }, [currentIndex, isAnimating])

  const swipeConfidenceThreshold = 5000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1)
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1)
    }
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      }
    }),
  }

  const automationVariants = {
    initial: { width: 0 },
    animate: { 
      width: '100%',
      transition: {
        duration: 1.5,
        ease: "easeOut",
      }
    }
  }

  return (
    <section id="case-studies" className="py-6 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-center mb-4 md:mb-16"
        >
          <h2 className="heading-lg gradient-text-enhanced mb-2 md:mb-6 text-2xl md:text-4xl lg:text-5xl">
            Transforming Businesses with AI
          </h2>
          <p className="text-sm md:text-xl text-white/80 max-w-3xl mx-auto">
            See how our AI solutions have revolutionized operations
          </p>
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                className="w-full touch-pan-y"
              >
                <div className="card group hover:border-accent-400/50 transition-colors duration-300">
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-8">
                    <motion.div 
                      className="relative rounded-lg overflow-hidden h-[160px] md:h-[500px] order-1 md:order-2 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 mix-blend-overlay" />
                      <img
                        src={caseStudies[currentIndex].image}
                        alt={caseStudies[currentIndex].title}
                        className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_15px_rgba(129,140,248,0.3)]"
                      />
                    </motion.div>

                    <div className="space-y-3 md:space-y-8 order-2 md:order-1">
                      <div className="space-y-2 md:space-y-4">
                        <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-accent-300 transition-colors duration-300">
                          {caseStudies[currentIndex].title}
                        </h3>
                        <p className="text-base md:text-xl text-accent-400">
                          {caseStudies[currentIndex].company}
                        </p>
                        <p className="text-xs md:text-base text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          {caseStudies[currentIndex].description}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 md:gap-6">
                        {caseStudies[currentIndex].stats.map((stat, index) => (
                          <div
                            key={stat.label}
                            className="card group/stat relative overflow-hidden p-1.5 md:p-4"
                          >
                            <motion.div
                              className="absolute bottom-0 left-0 h-0.5 md:h-1 bg-accent-400"
                              variants={automationVariants}
                              initial="initial"
                              animate="animate"
                              key={`progress-${currentIndex}-${index}`}
                            />
                            <div className="text-base md:text-2xl font-bold text-white group-hover/stat:text-accent-300 transition-colors duration-300">
                              {stat.value}
                            </div>
                            <div className="text-[10px] md:text-sm text-white/70 group-hover/stat:text-white/90 transition-colors duration-300">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 md:mt-8 space-y-2 md:space-y-4">
                        <h4 className="text-base md:text-xl font-semibold text-accent-400">Key Features:</h4>
                        <ul className="grid grid-cols-2 gap-1.5 md:gap-4">
                          {caseStudies[currentIndex].features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center space-x-1.5 md:space-x-2 text-xs md:text-base text-white/70"
                            >
                              <svg 
                                className="w-3 h-3 md:w-5 md:h-5 text-accent-400 flex-shrink-0" 
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
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile-optimized Navigation Controls */}
          <div className="mt-3 md:mt-8 flex items-center justify-center space-x-4 md:space-x-8">
            <button
              className={`p-1.5 md:p-3 rounded-full bg-primary-800/20 backdrop-blur-sm 
                border-2 border-accent-400/20 text-accent-400/50
                transition-colors duration-300
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              onClick={() => !isAnimating && paginate(-1)}
              disabled={isAnimating}
            >
              <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 19l-7-7 7-7" 
                />
              </svg>
            </button>

            <div className="flex space-x-1 md:space-x-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  disabled={isAnimating}
                  className={`h-0.5 md:h-1.5 rounded-full transition-colors duration-300 
                    ${index === currentIndex 
                      ? 'w-3 md:w-6 bg-accent-400' 
                      : 'w-0.5 md:w-1.5 bg-accent-400/30'
                    } ${isAnimating ? 'cursor-not-allowed' : ''}`}
                />
              ))}
            </div>

            <button
              className={`p-1.5 md:p-3 rounded-full bg-primary-800/20 backdrop-blur-sm 
                border-2 border-accent-400/20 text-accent-400/50
                transition-colors duration-300
                ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              onClick={() => !isAnimating && paginate(1)}
              disabled={isAnimating}
            >
              <svg className="w-3 h-3 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 