'use client'
import React from 'react'
import {motion} from 'motion/react'

export default function page() {
  return (
    <div className='min-h-screen bg-zinc-100 px-4 py-12'>
      <div className='relative max-w-6xl mx-auto z-10'>
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className='mb-10'
            >

        </motion.div>
      </div>
    </div>
  )
}
