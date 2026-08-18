"use client"
import { BookingStatus, PaymentStatus } from '@/models/booking.model';
import { IUser } from '@/models/user.model';
import { IVehicle } from '@/models/vehicle.model';
import axios from 'axios'
import { Car, Loader2, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export interface IBooking {
  user: IUser;
  driver: IUser;
  vehicle: IVehicle;

  pickUpAddress: string;
  dropAddress: string;

  pickUpLocation?: {
    type: "Point";
    coordinates: [number, number];
  };
  dropLocation?: {
    type: "Point";
    coordinates: [number, number];
  };
  fare: number;

  userMobileNumber: string;
  driverMobileNumber: string;

  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentDeadline: Date;
  adminCommission: number;
  partnerAmount: number;

  pickUpOtp: string;
  pickUpOtpExpires: Date;
  dropOtp: string;
  dropOtpExpires: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function page() {

    const [bookings, setBookings] = useState<IBooking[] | []>([])
    const [selectStatus, setSelectStatus]= useState("All")
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetch = async ()=>{
          setLoading(true)
            try {
                const {data} = await axios.get("/api/partner/bookings")
                console.log(data)
                setBookings(data)
                setLoading(false)
            } catch (error:any) {
                console.log(error.response.data.message)
                setLoading(false)
            }
        }
        fetch()
    },[])

    const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
        confirmed:        "bg-emerald-50 text-emerald-700 border-emerald-200",
        completed:        "bg-teal-50 text-teal-700 border-teal-200",
        requested:        "bg-amber-50 text-amber-700 border-amber-200",
        awaiting_payment: "bg-blue-50 text-blue-700 border-blue-200",
        cancelled:        "bg-rose-50 text-rose-700 border-rose-200",
        rejected:         "bg-red-50 text-red-700 border-red-200",
        expired:          "bg-gray-50 text-gray-700 border-gray-200",
      };
      return colors[status] || "bg-gray-50 text-gray-700 border-gray-200"
    }

    const filterBookings = selectStatus === "All"
    ? bookings
    : bookings.filter(b => b.bookingStatus === selectStatus.toLowerCase());

  return (
    <div className='min-h-screen bg-gray-50'>

      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-3xl mx-auto py-6'>
            <div className='flex items-center gap-3'>
                <div className='bg-blue-100 p-2 rounded-lg'>
                  <Car className='w-5 h-5 text-blue-600'/>
                </div>
                <div className=''>
                  <h1 className='text-2xl font-semibold text-gray-900'>Partner Bookings</h1>
                  <p className='text-gray-500 text-sm mt-1'>{bookings.length} {bookings.length === 1 ? 'ride' : 'rides'} assigned to you</p>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex justify-between items-center mb-6'>
            <div className='text-sm text-gray-500'>
              Showing {filterBookings.length} bookings
            </div>
            <select
              value={selectStatus}
              onChange={(e)=>setSelectStatus(e.target.value)}
              className='bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option>All</option>
              <option>requested</option>
              <option>awaiting_payment</option>
              <option>confirmed</option>
              <option>started</option>
              <option>completed</option>
              <option>cancelled</option>
              <option>rejected</option>
              <option>expired</option>
            </select>
          </div>

          {loading && (
            <div className='flex justify-center py-16'>
              <Loader2 className='animate-spin w-8 h-8 text-black'/>
            </div>
          )}

          {!loading && filterBookings.length===0 && (
            <div className='bg-white rounded-xl shadow-sm p-12 text-center'>
              <Car className='w-12 h-12 text-gray-300 mx-auto mb-3'/>
              <h1 className='text-lg font-medium text-gray-900'>No bookings yet</h1>
              <p className='text-gray-500 text-sm mt-1'>When customers book rides, they will appear here</p>
            </div>
          )}

          {!loading && filterBookings.length>0 && (
            <div className='space-y-4'>
              {filterBookings.map((b,i)=>(
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className='bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden'>
                    <div className='flex items-center gap-3 p-4 bg-linear-to-r from-blue-50 to-indigo-50 border-b border-gray-200'>
                      <div className='w-12 h-12 rounded-full overflow-hidden bg-blue-200 flex-shrink-0 border-2 border-white shadow-sm flex items-center justify-center'>
                        <User className='w-6 h-6 text-blue-600'/>
                      </div>
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold text-gray-900'>{b.user.name.toUpperCase() || "Customer"}</h3>
                          <span>{b.bookingStatus}</span>
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
    </div>
  )
}
