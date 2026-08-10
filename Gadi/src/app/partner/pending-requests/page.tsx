'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'
import { IBooking } from '@/models/booking.model'
import { Loader2, MapPin } from 'lucide-react'

export default function page() {

    const [bookings, setBookings] = useState<IBooking[]>([])
    const [loading, setLoading] = useState(false)

    const fetchPendingRequests = async ()=>{
      try {
        setLoading(true)
        const { data } = await axios.get("/api/partner/bookings/pending")
        setBookings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    useEffect(()=>{
      fetchPendingRequests()
    },[])
  return (
    <div className='min-h-screen bg-[#f4f5f7]'>
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-6xl mx-auto px-6 py-16'>
          <h1 className='text-4xl font-semibold text-gray-900'>Ride Requests</h1>
          <p className='mt-3 text-gray-500 text-lg'>Manage incoming ride requests and responds in real time.</p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-12'>
        {loading ? (
          <div className='flex justify-center py-20'>
            <Loader2 className='animate-spin w-8 h-8 text-gray-700'/>
          </div>
        ):bookings.length==0 ? (
          <div className='bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm'>
            <p className='text-gray-500 text-lg'>No pending ride requests.</p>
          </div>
        ):(
          <div className='space-y-6'>
            {bookings.map((b,i)=>(
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.25 }}
                className='bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition'
              >
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8'>
                  <div className='flex-1 space-y-6'>
                    <div className='flex gap-4'>
                      <div className='bg-gray-100 p-3 rounded-lg flex items-center justify-center'><MapPin size={18}/></div>
                      <div>
                        <p className='text-xs uppercase text-gray-400 mb-1'>Pickup Location</p>
                        <p className='text-gray-900 font-medium'>{b.pickUpAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
