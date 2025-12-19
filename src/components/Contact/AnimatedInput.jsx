import { useState } from 'react'
import { motion } from 'framer-motion'

function AnimatedInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  multiline = false,
  rows = 1,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const isActive = isFocused || value

  const InputComponent = multiline ? 'textarea' : 'input'

  return (
    <div className="relative">
      <motion.label
        className={`absolute left-4 font-body transition-all duration-300 pointer-events-none ${
          isActive
            ? 'text-xs text-orange top-2'
            : 'text-navy/50 top-1/2 -translate-y-1/2'
        } ${multiline && !isActive ? 'top-4 translate-y-0' : ''}`}
        animate={{
          scale: isActive ? 0.85 : 1,
          originX: 0,
        }}
      >
        {label}
        {required && <span className="text-orange ml-1">*</span>}
      </motion.label>

      <InputComponent
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required={required}
        rows={multiline ? rows : undefined}
        className={`w-full bg-cream/50 border-2 rounded-xl font-body text-navy outline-none transition-all duration-300 resize-none ${
          multiline ? 'pt-7 pb-4 px-4' : 'pt-6 pb-2 px-4'
        } ${
          isFocused
            ? 'border-orange bg-white shadow-lg shadow-orange/10'
            : 'border-cream-dark hover:border-navy/20'
        }`}
        data-cursor=""
      />

      {/* Focus line animation */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-0.5 bg-orange rounded-full"
        initial={{ width: 0, x: '-50%' }}
        animate={{
          width: isFocused ? '100%' : 0,
          x: '-50%',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect on focus */}
      {isFocused && (
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-orange pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: [0, 1, 0], scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  )
}

export default AnimatedInput

