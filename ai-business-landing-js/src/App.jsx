import { useEffect } from 'react'
import Hero from './components/Hero'
import Services from './components/Services'
import Features from './components/Features'
import Integrations from './components/Integrations'
import CaseStudies from './components/CaseStudies'
import CallToAction from './components/CallToAction'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ROICalculator from './components/ROICalculator'

function App() {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Fix for mobile navigation offset
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const offset = 80; // Height of the fixed navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="bg-primary-900 min-h-screen">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="services">
          <Services />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="calculator" className="py-16">
          <ROICalculator />
        </div>
        <div id="integrations">
          <Integrations />
        </div>
        <div id="case-studies">
          <CaseStudies />
        </div>
        <div id="contact">
          <CallToAction />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
