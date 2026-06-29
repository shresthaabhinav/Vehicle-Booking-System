'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

export default function page() {

    const {id} = useParams()
    const [data, setData] = useState()

    useEffect(()=>{
        const load = async ()=>{
            try{
                const result = await axios.get(`/api/admin/reviews/vehicle/${id}`)
                setData(result.data)
            }catch(error:any){
                console.log(error.response.data.message ?? error)
            }
        }
        load()
    },[id])

  return (
    <div className='min-h-screen bg-gray-50'>
      
    </div>
  )
}
