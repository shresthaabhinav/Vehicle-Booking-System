import { Bike, Bus, Car, CarTaxiFront, ChevronLeft, ChevronRight, Truck } from "lucide-react";
import {motion} from "motion/react";
import { useState } from "react";

const VEHICLE_CATEGORIES = [
  {
    title: "All Vehicles",
    desc: "Browse every available vehicle option for any travel or transport need.",
    Icon: CarTaxiFront,
    tag: "Popular",
  },
  {
    title: "Bikes",
    desc: "Quick and fuel-efficient rides perfect for city travel and short trips.",
    Icon: Bike,
    tag: "Quick",
  },
  {
    title: "Cars",
    desc: "Comfortable and convenient vehicles for personal and family journeys.",
    Icon: Car,
    tag: "Comfort",
  },
  {
    title: "SUVs",
    desc: "Premium spacious vehicles designed for luxury and rough-road performance.",
    Icon: Car,
    tag: "Premium",
  },
  {
    title: "Vans",
    desc: "Ideal choice for family outings, group travel, and extra luggage space.",
    Icon: Bus,
    tag: "Family",
  },
  {
    title: "Trucks",
    desc: "Powerful transport vehicles built for cargo delivery and heavy loads.",
    Icon: Truck,
    tag: "Cargo",
  },
];

export default function VehicleSlider() {

  const [ hovered,setHovered ] = useState<number>()

  return (
    <div className="w-full h-[200vh] bg-white py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-end justify-between mb-10"
        >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-zinc-900"/>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Fleet</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-none">
                Vehicles
                <br/>
                <span className="relative inline-block">
                  Categories
                  <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-zinc-900 origin-left"
                  />

                </span>
              </h2>

              <p className="text-zinc-400 text-sm mt-3 font-medium">Choose the ride that fits your journey</p>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <motion.div
              whileTap={{ scale: 0.88}}
              className="w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm"
              >
                <ChevronLeft size={18} strokeWidth={2.5}/>
              </motion.div>

              <motion.div
              whileTap={{ scale: 0.88}}
              className="w-11 h-11 rounded-2xl border border-zinc-200 bg-white flex items-center justify-center hover:bg-zinc-900 hover:border-zinc-900 hover:text-white disabled:opacity-25 disabled:hover:bg-white disabled:hover:text-zinc-900 disabled:hover:border-zinc-200 transition-all text-zinc-700 shadow-sm"
              >
                <ChevronRight size={18} strokeWidth={2.5}/>
              </motion.div>
            </div>

        </motion.div>
        <div className="relative">
        <div className="flex gap-5 pt-20 overflow-x-auto scroll-smooth pb-4 px-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {
          VEHICLE_CATEGORIES.map((c,i)=>{
            
            const isHovered = hovered==i

            return(
              <motion.div
              key={i}
              initial={{ opacity: 1, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i + 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={()=> setHovered(null)}
              whileHover={{ y: -8 }}
              className="group relative min-w-[220px] sm:min-w-[260px] flex-shrink-0 cursor-pointer"

              >

              </motion.div>
            )
          })
          }
        </div>
        </div>
      </div>
    </div>
  )
}
