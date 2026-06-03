'use client'
import React from 'react'
import { motion } from 'motion/react'

export default function page() {
  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        className='w-full max-w-xl bg-white rounded-3xl border bordr-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
      >

      </motion.div>
    </div>
  )
}
