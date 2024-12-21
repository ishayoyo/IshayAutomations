import { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import ProcessTimeline from './components/ProcessTimeline'
import CaseStudies from './components/CaseStudies'
import Integrations from './components/Integrations'
import CallToAction from './components/CallToAction'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    // Preload animations and heavy assets
    const preloadAssets = async () => {
      // Add preloading logic here
    }
    preloadAssets()
  }, [])

  return (
    <div className="relative bg-primary-900 min-h-screen">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-secondary-400 z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <Services />
        <Features />
        <ProcessTimeline />
        <CaseStudies />
        <Integrations />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
