import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest: number) => {
      setIsScrolled(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id') || ''

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  }

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  }

  const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Features', href: '#features' },
    { name: 'Process', href: '#process' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Integrations', href: '#integrations' }
  ]

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold gradient-text-enhanced z-50"
          >
            AI Business
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className={`nav-link text-white drop-shadow-glow hover:text-white ${
                  activeSection === item.href.substring(1)
                    ? 'font-semibold text-white glow-effect'
                    : 'text-white/90'
                } transition-all`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary glow-effect"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white drop-shadow-glow z-50"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 relative"
            >
              <motion.span
                className="absolute w-6 h-0.5 bg-white transform transition-all duration-300"
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-white transform transition-all duration-300"
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                style={{ top: "50%", translateY: "-50%" }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-white transform transition-all duration-300"
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 16 }}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-0 bg-primary-900/98 backdrop-blur-lg md:hidden pt-24 px-6"
            >
              <motion.div className="flex flex-col space-y-8">
                {menuItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    variants={menuItemVariants}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl drop-shadow-glow ${
                      activeSection === item.href.substring(1)
                        ? 'font-semibold text-white glow-effect'
                        : 'text-white/90 hover:text-white'
                    } transition-all`}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full glow-effect"
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar 