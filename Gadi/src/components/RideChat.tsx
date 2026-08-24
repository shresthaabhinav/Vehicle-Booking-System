'use client'
import React from 'react'

export default function RideChat({currentRole, bookingId, userName, driverName}:any) {

    const otherName = currentRole == "user" ? driverName : userName
    
  return (
    <div className='flex flex-col h-full min-h-0 bg-white rounded-2xl overflow-hidden border border-zinc-100'>
      
    </div>
  )
}
