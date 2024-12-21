import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const caseStudies = [
  {
    title: 'E-commerce Revolution',
    company: 'Global Retail Corp',
    description:
      'Implemented AI-powered recommendation engine resulting in 45% increase in sales.',
    stats: [
      { label: 'Sales Increase', value: '45%' },
      { label: 'User Engagement', value: '3x' },
      { label: 'ROI', value: '280%' },
    ],
    image: '/images/case1.jpg',
  },
  {
    title: 'Smart Manufacturing',
    company: 'Industrial Tech Ltd',
    description:
      'Automated quality control system reduced defects by 78% and improved efficiency.',
    stats: [
      { label: 'Defect Reduction', value: '78%' },
      { label: 'Efficiency Gain', value: '60%' },
      { label: 'Cost Savings', value: '$2.5M' },
    ],
    image: '/images/case2.jpg',
  },
  {
    title: 'Financial Innovation',
    company: 'NextGen Banking',
    description:
      'AI-driven fraud detection system prevented $10M in potential losses.',
    stats: [
      { label: 'Fraud Prevention', value: '$10M' },
      { label: 'Detection Rate', value: '99.9%' },
      { label: 'False Positives', value: '<0.1%' },
    ],
    image: '/images/case3.jpg',
  },
]

const CaseStudies = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + caseStudies.length) % caseStudies.length)
  }

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden">
      {/* Background with gradient overlay */}
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

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
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
                          transition={{ delay: index * 0.1 }}
                          className="card group/stat hover:border-accent-400/50 transition-all duration-300"
                        >
                          <div className="text-2xl font-bold text-white group-hover/stat:text-accent-300 transition-colors duration-300">
                            {stat.value}
                          </div>
                          <div className="text-sm text-white/70 group-hover/stat:text-white/90 transition-colors duration-300">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-secondary-400/20 mix-blend-overlay" />
                    <img
                      src={caseStudies[currentIndex].image}
                      alt={caseStudies[currentIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400 text-accent-400 hover:text-accent-300 transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400 text-accent-400 hover:text-accent-300 transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View More Success Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default CaseStudies 