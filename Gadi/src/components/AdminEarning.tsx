'use client'
import axios from 'axios'
import { useEffect } from 'react'

export default function AdminEarning() {
  
  useEffect(()=>{
    const fetchEarning = async () =>{
        try {
            const {data} = await axios.get("/api/admin/earning")
        } catch (error) {
            
        }
    }
    fetchEarning()
  },[])

    return (
    <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6 w-full'>
      <div className='flex items-start justify-between mb-6 flex-wrap gap-4'>
        <div>
            <span className='inline-block text-[11px] font-semibold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-2'>
                Admin Dashboard
            </span>
            <h2 className='text-xl font-bold text-gray-900 tracking-tight'>
                Daily Earnings
            </h2>
            <p>
                Last 7 Days Performance
            </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}
