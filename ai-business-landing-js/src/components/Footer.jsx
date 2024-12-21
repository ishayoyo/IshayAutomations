import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/95 via-primary-900 to-primary-900/95" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <motion.h3
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              AI Business
            </motion.h3>
            <motion.p
              className="text-white/70"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Transforming businesses with cutting-edge AI solutions.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Quick Links
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <li>
                <a href="#" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#features" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#case-studies" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  Case Studies
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Contact
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <li className="text-white/70">
                123 AI Street
              </li>
              <li className="text-white/70">
                Tech City, TC 12345
              </li>
              <li>
                <a href="mailto:contact@aibusiness.com" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  contact@aibusiness.com
                </a>
              </li>
              <li>
                <a href="tel:+1-555-123-4567" className="text-white/70 hover:text-accent-300 transition-colors duration-300">
                  +1 (555) 123-4567
                </a>
              </li>
            </motion.ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <motion.h4
              className="text-lg font-semibold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Follow Us
            </motion.h4>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.a
                href="#"
                className="text-white/70 hover:text-accent-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-white/70 hover:text-accent-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a
                href="#"
                className="text-white/70 hover:text-accent-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16H8v-6h2v6zM9 9.109c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zM17 16h-2v-3.158c0-.674-.012-1.542-.935-1.542-.936 0-1.079.733-1.079 1.49V16h-2v-6h1.918v.875h.028c.24-.455.827-.935 1.703-.935 1.822 0 2.156 1.2 2.156 2.762V16z"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 text-center text-white/70"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p>&copy; {new Date().getFullYear()} AI Business. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 