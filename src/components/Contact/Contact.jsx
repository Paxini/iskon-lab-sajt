import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AnimatedInput from './AnimatedInput'
import MagneticButton from '../ui/MagneticButton'
import { useLanguage } from '../../context/LanguageContext'

function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(false)
    
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        // Reset after showing success
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({ name: '', email: '', company: '', message: '' })
        }, 3000)
      } else {
        setSubmitError(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 bg-cream overflow-hidden"
    >
      {/* Animated background mesh */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(232, 111, 58, 0.1) 0%, transparent 50%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(26, 39, 68, 0.08) 0%, transparent 50%)',
          }}
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="inline-block px-4 py-2 bg-orange/10 text-orange font-display text-sm font-semibold rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('contact.badge')}
            </motion.span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              {t('contact.title')} <span className="text-orange">{t('contact.titleHighlight')}</span>
            </h2>

            <p className="text-navy/60 font-body text-lg mb-8 leading-relaxed">
              {t('contact.description')}
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                  <span className="text-xl">✉️</span>
                </div>
                <div>
                  <p className="text-navy/50 text-sm font-body">{t('contact.email')}</p>
                  <p className="text-navy font-display font-medium">hello@iskonlab.com</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <p className="text-navy/50 text-sm font-body">{t('contact.phone')}</p>
                  <p className="text-navy font-display font-medium">+381 65 231 8611</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <p className="text-navy/50 text-sm font-body">{t('contact.location')}</p>
                  <p className="text-navy font-display font-medium">{t('contact.locationValue')}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-cream-dark"
            >
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-body text-sm"
                >
                  {t('contact.form.error')}
                </motion.div>
              )}

              {!isSubmitted ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <AnimatedInput
                      label={t('contact.form.name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <AnimatedInput
                      label={t('contact.form.email')}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <AnimatedInput
                      label={t('contact.form.company')}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-8">
                    <AnimatedInput
                      label={t('contact.form.message')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      required
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-navy text-cream font-display font-semibold rounded-xl hover:bg-orange transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    data-cursor="Send"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>{t('contact.form.sending')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('contact.form.submit')}</span>
                        <span>→</span>
                      </>
                    )}
                  </MagneticButton>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    <motion.svg
                      className="w-10 h-10 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                  <h3 className="font-display text-2xl font-bold text-navy mb-2">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-navy/60 font-body">
                    {t('contact.form.successMessage')}
                  </p>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

