'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

type Earning = {
  date: string,
  earnings: number
}

export default function AdminEarning() {
  
  const [earningData, setEarningData] = useState<Earning[]>([])

  useEffect(()=>{
    const fetchEarning = async () =>{
        try {
            const {data} = await axios.get("/api/admin/earning")
            const last7DaysData:Earning[] = data.slice(-7)
            setEarningData(last7DaysData)

        } catch (error) {
            
        }
    }
    fetchEarning()
  },[])

  const total = earningData.reduce((a,d)=>a+d.earnings, 0)
  const avg = earningData.length?Math.round(total/earningData.length) : 0
  const max = earningData.length?Math.max(...earningData.map((d)=>d.earnings)) : 0
  const bestDay = earningData.find(d=>d.earnings === max)
  const today = earningData[earningData.length-1]
  const yesterday = earningData[earningData.length - 2]
  const delta = today && yesterday ? today.earnings-yesterday.earnings : 0
  const deltaPositive = delta >= 0
  const deltaPct = yesterday ? Math.abs(Math.round((delta / yesterday.earnings) * 100)) : 0

  const metrics = [
    {
      label: "Best Day",
      value: fmt(max),
    }
  ]
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
            <p className='text-sm text-gray-400 mt-0.5'>
                Last 7 Days Performance
            </p>
        </div>
        <div className='text-right'>
          <p className='text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1'>
            Weekly Total
          </p>
        </div>
      </div>
    </div>
  )
}
