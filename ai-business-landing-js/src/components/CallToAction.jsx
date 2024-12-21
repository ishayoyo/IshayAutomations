import { useState } from 'react'
import { motion } from 'framer-motion'

const CallToAction = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormState({
        name: '',
        email: '',
        company: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 space-y-4"
          >
            <motion.div 
              className="text-accent-400 uppercase tracking-widest text-sm font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Get Started
            </motion.div>
            
            <motion.h2
              className="heading-lg gradient-text-enhanced mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Get in touch with our AI experts and discover how we can help you achieve your business goals
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div 
                  className="card group hover:border-accent-400/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-full bg-primary-800/50 backdrop-blur-sm flex items-center justify-center relative border-2 border-accent-400 text-accent-400 group-hover:text-accent-300 transition-colors duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-300 transition-colors duration-300">
                        Email Us
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        contact@aibusiness.com
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="card group hover:border-accent-400/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 rounded-full bg-primary-800/50 backdrop-blur-sm flex items-center justify-center relative border-2 border-accent-400 text-accent-400 group-hover:text-accent-300 transition-colors duration-300">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/10 to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-accent-300 transition-colors duration-300">
                        Call Us
                      </h3>
                      <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400/20 focus:border-accent-400 text-white placeholder-white/50 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400/20 focus:border-accent-400 text-white placeholder-white/50 transition-all duration-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400/20 focus:border-accent-400 text-white placeholder-white/50 transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-primary-800/50 backdrop-blur-sm border-2 border-accent-400/20 focus:border-accent-400 text-white placeholder-white/50 transition-all duration-300 resize-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-primary relative overflow-hidden ${
                      isSubmitting ? 'opacity-80' : ''
                    }`}
                  >
                    {isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-accent-400/20 to-secondary-400/20"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: 'linear',
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {isSuccess
                        ? 'Message Sent!'
                        : isSubmitting
                        ? 'Sending...'
                        : 'Get Started'}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction 