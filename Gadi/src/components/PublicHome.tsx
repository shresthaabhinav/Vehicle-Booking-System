"use client"
import { useState } from "react";
import AuthModal from "./AuthModal";
import HeroSection from "./HeroSection";
import VehicleSlider from "./VehicleSlider";

export default function PublicHome() {
  
    const [ authOpen, setAuthOpen ] = useState(false)

    return (
    <>
    <HeroSection onAuthRequired={()=>setAuthOpen(true)}/>
    <VehicleSlider onAuthRequired={()=>setAuthOpen(true)}/>
    <AuthModal open={authOpen} onClose={()=>setAuthOpen(false)}/>
    </>
  )
}
