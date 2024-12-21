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
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + caseStudies.length) % caseStudies.length)
  }

  return (
    <section id="case-studies" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Success Stories</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See how our AI solutions have transformed businesses across industries.
          </p>
        </motion.div>

        <div className="relative h-[600px] max-w-5xl mx-auto">
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
              className="absolute w-full"
            >
              <div className="bg-dark-light rounded-2xl overflow-hidden shadow-2xl">
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                      <h3 className="text-3xl font-bold gradient-text mb-2">
                        {caseStudies[currentIndex].title}
                      </h3>
                      <p className="text-xl text-primary mb-4">
                        {caseStudies[currentIndex].company}
                      </p>
                      <p className="text-gray-400 mb-8">
                        {caseStudies[currentIndex].description}
                      </p>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-4">
                      {caseStudies[currentIndex].stats.map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center"
                        >
                          <div className="text-2xl font-bold gradient-text mb-2">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-overlay" />
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-dark-light p-3 rounded-full text-primary hover:text-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-dark-light p-3 rounded-full text-primary hover:text-accent transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default CaseStudies 