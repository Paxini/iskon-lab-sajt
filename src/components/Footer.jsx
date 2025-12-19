import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import MagneticButton from './ui/MagneticButton'

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'GitHub', href: 'https://github.com' },
]

const quickLinks = [
  { name: 'Usluge', href: '/usluge', type: 'route' },
  { name: 'Portfolio', href: '/projekti', type: 'route' },
  { name: 'O nama', href: '/o-nama', type: 'route' },
  { name: 'Kontakt', href: '#contact', type: 'scroll' },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLinkClick = (link) => {
    if (link.type === 'route') {
      navigate(link.href)
    } else {
      // Scroll to contact section
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const element = document.querySelector(link.href)
          if (element && window.lenis) {
            window.lenis.scrollTo(element, { offset: -100 })
          }
        }, 100)
      } else {
        const element = document.querySelector(link.href)
        if (element && window.lenis) {
          window.lenis.scrollTo(element, { offset: -100 })
        }
      }
    }
  }

  return (
    <footer className="bg-navy text-cream py-16 relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-cream to-orange opacity-50" />
      
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-orange/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.img
              src="/logo-transparent.png"
              alt="Iskon Lab"
              className="h-12 w-auto brightness-0 invert"
              whileHover={{ scale: 1.05 }}
            />
            <p className="text-cream/70 font-body text-sm max-w-xs">
              Digitalna rešenja bez granica. Povezujemo kreativnost i tehnologiju.
            </p>
            <p className="text-cream/50 text-sm font-body">
              Srbija → Svet
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Brzi linkovi</h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className="text-cream/70 hover:text-orange transition-colors font-body text-sm w-fit text-left"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">Kontakt</h4>
            <div className="space-y-2 text-cream/70 font-body text-sm">
              <p>hello@iskonlab.rs</p>
              <p>+381 11 123 4567</p>
            </div>
            
            <div className="flex gap-4 pt-4">
              {socialLinks.map((social) => (
                <MagneticButton
                  key={social.name}
                  onClick={() => window.open(social.href, '_blank')}
                  className="w-10 h-10 rounded-full border border-cream/30 flex items-center justify-center text-cream/70 hover:bg-orange hover:border-orange hover:text-cream transition-all duration-300"
                  data-cursor={social.name}
                  strength={0.4}
                >
                  <span className="text-xs font-display font-medium">
                    {social.name.charAt(0)}
                  </span>
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cream/50 text-sm font-body">
            © {currentYear} Iskon Lab. Sva prava zadržana.
          </p>
          <p className="text-cream/50 text-sm font-body">
            Napravljeno sa strašću u Srbiji
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

