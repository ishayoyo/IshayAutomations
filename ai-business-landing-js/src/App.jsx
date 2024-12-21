import { useEffect } from 'react'
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
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="bg-primary-900 min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <ProcessTimeline />
        <CaseStudies />
        <Integrations />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default App
