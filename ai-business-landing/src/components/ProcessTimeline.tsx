import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    title: 'Initial Consultation',
    description: 'We analyze your business needs and identify opportunities for AI integration.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    title: 'Strategy Development',
    description: 'Our experts create a tailored implementation plan for your business.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: 'Development & Integration',
    description: 'We build and integrate AI solutions seamlessly into your workflow.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    title: 'Testing & Optimization',
    description: 'Rigorous testing ensures optimal performance and reliability.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
        />
      </svg>
    ),
  },
  {
    title: 'Launch & Support',
    description: 'We ensure smooth deployment and provide ongoing maintenance.',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        />
      </svg>
    ),
  },
]

const ProcessTimeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="process" className="py-24 relative overflow-hidden">
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
            How We Work
          </motion.div>
          
          <motion.h2
            className="heading-lg gradient-text-enhanced mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our Implementation Process
          </motion.h2>
          
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            A systematic approach to implementing AI solutions that deliver measurable business value
          </motion.p>
        </motion.div>

        <div
          ref={ref}
          className="relative max-w-5xl mx-auto"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary-800">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent-400 to-secondary-400"
              style={{
                height: isInView ? "100%" : "0%",
                transition: "height 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* Timeline steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`flex items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-16 text-right" : "pl-16"}`}>
                  <motion.div
                    className="card group hover:border-accent-400/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Icon */}
                <div className="relative">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-primary-800/50 backdrop-blur-sm flex items-center justify-center relative z-10 border-2 border-accent-400 text-accent-400 group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="group-hover:text-accent-300 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>

                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
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
            Start Your AI Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessTimeline 