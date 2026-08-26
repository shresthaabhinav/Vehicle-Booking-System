"use client";
import { Car, Clock, MessageCircle, Phone, User } from "lucide-react";
import React from "react";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import RideChat from "./RideChat";

export default function PanelContent({
  isActive,
  displayDistance,
  displayEta,
  cfg,
  status,
  booking,
  paymentStatus,
  canChat,
  chatOpen,
  onChatToggle,
  currentRole
}: any) {

  return (
    <div className="flex flex-col pt-5 pb-4 gap-3">
      {isActive && (
        <div className="mx-5 lg:mx-6 grid grid-cols-2 gap-2">
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0">
              <Clock size={16} className="text-zinc-600" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
                ETA
              </p>
              <p className="text-lg font-black text-zinc-900 leading-none mt-0.5">
                {Math.round(displayEta)}
                <span className="text-xs font-normal text-zinc-400 ml-0.5">
                  min
                </span>
              </p>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <TbCurrencyRupeeNepalese size={16} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                Fare
              </p>
              <p className="text-lg font-black text-white leading-none mt-0.5">
                {booking.fare || "-"}
              </p>
            </div>
          </div>
        </div>
      )}

      {booking.user && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-5 lg:mx-6"
        >
          <div className="bg-zinc-950 rounded-2xl p-4 flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-xl bg-zinc-800 flex items-center justify-center">
                <User size={26} className="text-zinc-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-400 w-4 h-4 rounded-full border-2 border-zinc-950" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-bold text-base truncate">
                  {booking?.user?.name || "customer"}
                </p>
                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full flex-shrink-0">
                  <TbCurrencyRupeeNepalese
                    size={10}
                    className="text-amber-400"
                  />
                  <span className="text-white text-xs font-semibold">
                    {booking.fare}
                  </span>
                </div>
              </div>

              {booking.paymentStatus && (
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${paymentStatus.cls ?? "bg-zinc-700 text-zinc-30"}`}
                  >
                    {paymentStatus.label}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1.5"></div>
            </div>
          </div>

          {isActive && (
            <div className="flex gap-2 mt-2">
              {booking.userMobileNumber && (
                <a
                  href={`tel:${booking.userMobileNumber}`}
                  className={`flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 active:scale-[0.97] transition-all text-zinc-900 py-3 rounded-xl text-sm font-semibold ${canChat ? "flex-1" : "w-full"}`}
                >
                  <Phone size={15} />
                  Call
                </a>
              )}
              {canChat && (
                <button
                  onClick={onChatToggle}
                  className={`flex-1 flex items-center justify-center gap-2 active:scale-[0.97] transition-all py-3 rounded-xl text-sm font-semibold ${chatOpen ? "bg-zinc-200 text-zinc-900" : "bg-zinc-900 hover:bg-zinc-800 text-white"}`}
                >
                    <MessageCircle size={15}/>
                  {chatOpen ? "Close Chat" : "Message"}
                </button>
              )}
            </div>
          )}
        </motion.div>
      )}

      <AnimatePresence>
        {chatOpen && canChat && (
            <motion.div
                key="chat"
                initial={{ opacity:0, height: 0 }}
                animate={{ opacity:1, height: 'auto' }}
                exit={{ opacity:0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                className="mx-5 lg:mx-6 overflow-hidden"
            >
                <div className="rounded-2xl overflow-hidden border border-zinc-100 h-[460px]">
                    <RideChat currentRole={currentRole} bookingId={booking._id} userName={booking?.user?.name || "customer"} driverName={booking.driver.name || ""}/>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {booking?.vehicle && (
        <div className="mx-5 lg:mx-6">
          <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex items-center gap-2">
            <div className="w-11 h-11 rounded-xl bg-zinc-900 flex items-center justify-center flex-shrink-0">
              <Car size={18} className="text-white"/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
