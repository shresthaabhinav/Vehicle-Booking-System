"use client"
import React from 'react'
import {AnimatePresence, motion} from "motion/react"
import { IVehicle } from '@/models/vehicle.model'

type PropsType={
    open: boolean,
    onClose: (a:boolean)=>void,
    data: IVehicle | null
}

export default function PriceModal({open, onClose, data}:PropsType) {
  return (
    <AnimatePresence>
    {open &&(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4'
        >

        </motion.div>
    )}
    </AnimatePresence>
  )
}
