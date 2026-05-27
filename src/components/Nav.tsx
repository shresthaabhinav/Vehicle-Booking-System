'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthModal from './AuthModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

const Nav_Items=["Home", "Bookings", "About Us", "Contact"]

export default function Nav() {

  const pathName = usePathname()
  const [ authOpen, setAuthOpen ] = useState(false)
  const { userData } = useSelector((state: RootState)=>state.user)

  return (
    <>
    <motion.div initial={{ y: -60, opacity: 0 }}
    animate={{ y:0, opacity: 1 }}
    className={`fixed top-3 left-1/2 -translate-x-1/2 w-[94%] md:w-[86%] z-50 rounded-full bg-[#0B0B0B] text-white shadow-[0_15px_50px_rgba(0,0,0,0.7)] py-3`}>
      <div className='max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between'>
        <Image src={"/logo.png"} alt='logo' width={44} height={44} priority/>

        <div className='hidden md:flex items-center gap-10'>
        {Nav_Items.map((i,index)=>{
          let href
          if(i=="Home"){
            href = '/'
          }else{
            href=`/${i.toLowerCase()}`
          }
          
          const active = href == pathName 

          return <Link key={index} href={href} className={`text-sm font-medium transition ${active ? "text-white" : "text-gray-400 hover:text-white"}`}>{i}</Link>
        })}
      </div>
      <div className='flex items-center gap-3 relative'>

        <div className='hidden md:block relative'>
          {!userData ? (
            <button className='px-4 p-1.5 rounded-full bg-white text-black text-sm' onClick={()=>setAuthOpen(true)}>
          Login
        </button>
          ):(
            <>
            <button className='w-11 h-11 rounded-full bg-white text-black font-bold'>
              {userData.name.charAt(0).toUpperCase()}
            </button>
            </>
          )}
        </div>
        
      </div>

      </div>
      
    </motion.div>
      <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)}/>
        </>
  )
}
