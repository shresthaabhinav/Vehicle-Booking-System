'use client'
import { IVehicle } from '@/models/vehicle.model'
import React from 'react'
import {motion} from 'motion/react'

export default function VehicleCard({vehicle, distance}:{vehicle:IVehicle,distance:number | undefined}) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
        className='relative bg-white border border-zinc-200 rounded-3xl overflow-hidden flex flex-group cursor-default'
        style={{ boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)"}}
        >
      <div className='relative h-48 bg-zinc-50 flex items-center justify-center overflow-hidden'>
        <div 
            className='absolute inset-0 opacity-[0.04]'
            style={{
                backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "24px 24px"
            }}
        />
      </div>
    </motion.div>
  )
}
