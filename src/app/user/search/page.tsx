"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchMap from "@/components/SearchMap";

export default function page() {
  const router = useRouter();
  const params = useSearchParams();
  const [pickUp, setPickUp] = useState(params.get("pickup") || "");
  const [drop, setDrop] = useState(params.get("drop") || "");
  const [km, setKm] = useState<number>();
  const mobile = params.get("mobile");
  const pickUpLat = Number(params.get("pickuplat"));
  const pickUpLon = Number(params.get("pickuplon"));
  const dropLat = Number(params.get("droplat"));
  const dropLon = Number(params.get("droplon"));
  const vehicle = params.get("vehicle");

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 overflow-x-hidden">
      <div className="absolute top-5 left-5 z-50">
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => router.back()}
          className="w-11 h-11 rounded-full bg-white border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50 transition-colors"
        >
          <ArrowLeft size={17} className="text-zinc-900" />
        </motion.button>
      </div>
      <div className="relative w-full h-[52vh] z-0">
        <SearchMap
          pickUp={pickUp}
          drop={drop}
          onChange={(p, d) => {
            setPickUp(p);
            setDrop(d);
          }}
          onDistance={setKm}
        />
      </div>

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 22 }}
        className="relative z-20 -mt-10 bg-white rounded-t-[28px] border-t border-zinc-200 [0_-8px_40px_rgba(0,0,0,0.08)] pt-5 pb-20 min-h-[52vh]">
          <div>
            
          </div>
      </motion.div>
    </div>
  );
}
