import { useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import ProcessTimeline from './components/ProcessTimeline'
import CaseStudies from './components/CaseStudies'
import Integrations from './components/Integrations'
import CallToAction from './components/CallToAction'
import Navbar from './components/Navbar'

function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    // Preload animations and heavy assets
    const preloadAssets = async () => {
      // Add preloading logic here
    }
    preloadAssets()
  }, [])

  return (
    <div className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main>
        <Hero />
        <Services />
        <Features />
        <ProcessTimeline />
        <CaseStudies />
        <Integrations />
        <CallToAction />
      </main>
      
      {/* Footer */}
      <footer className="bg-dark-light py-8 mt-20">
        <div className="container text-center">
          <p className="text-gray-400">© 2024 AI Business. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
