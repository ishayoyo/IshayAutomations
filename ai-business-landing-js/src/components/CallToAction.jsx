import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const AutomationStep = ({ icon, label, isActive, isComplete, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: isActive || isComplete ? 1 : 0.5, y: 0 }}
    className={`flex items-center space-x-3 ${isActive ? 'scale-110' : 'scale-100'}`}
    transition={{ delay }}
  >
    <div className={`w-10 h-10 rounded-full flex items-center justify-center relative ${
      isComplete ? 'bg-green-500/20' : isActive ? 'bg-accent-400/20' : 'bg-white/10'
    }`}>
      <div className={`absolute inset-0 rounded-full ${
        isActive ? 'animate-ping bg-accent-400/20' : ''
      }`} />
      {icon}
      {isComplete && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 bg-green-500/20 rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </div>
    <span className={`text-sm ${
      isActive ? 'text-accent-300' : isComplete ? 'text-green-500' : 'text-white/70'
    }`}>
      {label}
    </span>
  </motion.div>
)

const CallToAction = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])

  const automationSteps = [
    {
      icon: (
        <svg className="w-5 h-5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Form Submission"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: "CRM Update"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email Notification"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: "Calendar Check"
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Waiting for Reply"
    }
  ]

  useEffect(() => {
    if (isSubmitting) {
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= automationSteps.length - 1) {
            clearInterval(stepInterval)
            return prev
          }
          setCompletedSteps(completed => [...completed, prev])
          return prev + 1
        })
      }, 1000)

      return () => clearInterval(stepInterval)
    }
  }, [isSubmitting])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setCurrentStep(0)
    setCompletedSteps([])

    try {
      // Insert the lead into Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: formState.name,
            email: formState.email,
            company: formState.company,
            message: formState.message,
            created_at: new Date().toISOString(),
          }
        ])

      if (error) throw error

      // Send Telegram notification
      const telegramMessage = `
🌟 <b>New Lead Alert!</b> 🌟

👤 <b>Name:</b> ${formState.name}
📧 <b>Email:</b> ${formState.email}
🏢 <b>Company:</b> ${formState.company || 'Not provided'}

💬 <b>Message:</b>
<i>${formState.message}</i>

📅 <code>${new Date().toLocaleString()}</code>
------------------
Powered by IshayAutomations`
      
      await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      })

      // Simulate remaining automation process
      await new Promise((resolve) => setTimeout(resolve, 4000))

      setIsSuccess(true)
      setCompletedSteps(automationSteps.map((_, index) => index))
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setCurrentStep(0)
      setCompletedSteps([])
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
              Let's Connect
            </motion.div>
            
            <motion.h2
              className="heading-lg gradient-text-enhanced mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Ready to Automate Your Business?
            </motion.h2>
            
            <motion.p
              className="text-xl text-white/80 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Experience the power of automation firsthand. Fill out the form below and watch our system work its magic.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
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
                </div>

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
                    placeholder="Tell us about your automation needs..."
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
                    whileHover={{ scale: 1.02 }}
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
                        ? 'Success! Check your email'
                        : isSubmitting
                        ? 'Processing...'
                        : 'Start Your Automation Journey'}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Automation Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="card p-8 space-y-8">
                <h3 className="text-xl font-semibold text-white/90 mb-8">Watch the Automation Magic</h3>
                
                <div className="space-y-6 relative">
                  {/* Vertical line connecting steps */}
                  <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/10" />
                  
                  {automationSteps.map((step, index) => (
                    <AutomationStep
                      key={index}
                      icon={step.icon}
                      label={step.label}
                      isActive={currentStep === index}
                      isComplete={completedSteps.includes(index)}
                      delay={index * 0.1}
                    />
                  ))}
                </div>

                {/* Additional Info */}
                <AnimatePresence>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-sm text-white/60 pt-4"
                    >
                      {currentStep === 0 && "Processing your information..."}
                      {currentStep === 1 && "Updating CRM records..."}
                      {currentStep === 2 && "Sending confirmation email..."}
                      {currentStep === 3 && "Checking calendar availability..."}
                      {currentStep === 4 && "Preparing meeting suggestions..."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-primary-900/98 p-8 rounded-lg border-2 border-accent-400/20 backdrop-blur-sm w-full">
                      <div className="text-center space-y-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                        >
                          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                        <h4 className="text-xl font-semibold text-white">All Set!</h4>
                        <p className="text-white/70">We'll be in touch shortly with next steps.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction 