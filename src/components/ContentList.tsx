'use client'
import React from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, User } from 'lucide-react';

export default function ContentList({data, type}:any) {

  if(data?.length==0){
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl py-16 text-center border border-dashed border-gray-200 shadow-sm"
      >
        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={22} className="text-green-400" />
        </div>
        <p className="font-bold text-gray-800 text-base">All caught up</p>
        <p className="text-gray-400 text-sm mt-1">No pending items right now.</p>
      </motion.div>
    );
  }

  return (
    <div className='space-y-3'>
        <div className='flex items-center justify-between px-1 mb-1'>
          <p className='text-xs font-semibold uppercase tracking-widest text-gray-400'>
            {type==="partner" ? "Partner Reviews Queue" : type==="kyc" ? "Pending Video KYC Queue" : "vehicle Reviews Queue"}
          </p>
          <p className='text-xs text-gray-400'>{data.length} items</p>
        </div>
        {data.map((item:any, index:number)=>{
          const name = item.name
          const email = item.email

          return (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              className="bg-white border border-gray-100 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 bg-purple-800">
                  {name.charAt(0).toUpperCase() ?? <User size={14} />}
                </div>
              </div>
            </motion.div>
          );
        })}
    </div>
  )
}
