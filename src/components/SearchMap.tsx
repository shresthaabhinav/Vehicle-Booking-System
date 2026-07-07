'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

type props={
  pickUp: string,
  drop: string,
  onChange: (p: string, d: string) => void,
  onDistance: (d:number) =>void
}

export default function SearchMap({pickUp, drop, onChange, onDistance}:props) {

  const [p1, setP1] = useState<[number,number]>()
  const [p2, setP2] = useState<[number,number]>()

  const geoCoding = async (q: string):Promise<[number, number] | null> =>{
    try {
      const {data} = await axios.get(`https://photon.komoot.io/api/?q=${encodeURIComponent(q)}&limit=1`)
      if(!data.features.length) return null
      const [lon, lat] = data.features[0].geometry.coordinates
      return [lat, lon]
    } catch (error) {
      console.log(error)
      return null
    }
  }

  useEffect(()=>{
    if(pickUp && drop){
      
      const a = geoCoding(pickUp)
      const b = geoCoding(drop)
      if(!a || !b){
        return
      }
      setP1(a)
      setP2(b)
    }
  },[pickUp, drop])

  return (
    <div className='relative h-full w-full bg-zinc-100'>
      <MapContainer style={{ width: "100%", height: "100%" }} center={[0,0]} zoom={13}>
      <TileLayer attribution='&copy; <a href="https://carto.com/">"CARTO"</a> contributors' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
      </MapContainer>
    </div>
  )
}
