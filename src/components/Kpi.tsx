'use client'
import React from 'react'
import { motion } from 'motion/react'

const KPI_CONFIG: Record<
  string,
  {
    iconBg: string;
    iconColor: string;
    cardHover: string;
  }
> = {
  totalPartners: {
    iconBg: "bg-purple-50",
    iconColor: "text-purple-700",
    cardHover: "hover:shadow-purple-100/60",
  },
  approved: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-800",
    cardHover: "hover:shadow-blue-100/60",
  },
  pending: {
    iconBg: "bg-amber-50",
    iconColor: "text-amber-800",
    cardHover: "hover:shadow-amber-100/60",
  },
  rejected: {
    iconBg: "bg-red-50",
    iconColor: "text-red-800",
    cardHover: "hover:shadow-red-100/60",
  },
};
export default function Kpi({label, value, icon, variant}:any) {

    const cfg = KPI_CONFIG[variant]
  return (
    <motion.div 
        whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(0,0,0,0.10)"}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className= {`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm cursor-default overflow-hidden group ${cfg.cardHover}`}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${cfg.iconBg}`} style={{ zIndex: 0 }}/>
      
    </motion.div>
  )
}
