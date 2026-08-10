'use client'
import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import axios from 'axios'

export default function page() {
    const fetchPendingRequests = async ()=>{
      try {
        const { data } = await axios.get("/api/partner/bookings/pending")
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      fetchPendingRequests()
    },[])
  return (
    <div className='min-h-screen bg-[#f4f5f7]'>
      <div className='bg-white border-b border-gray-200'>
        <div className=''>
          <h1></h1>
          <p></p>
        </div>
      </div>
    </div>
  )
}
