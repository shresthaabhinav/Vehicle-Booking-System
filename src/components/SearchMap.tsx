'use client'
import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

type props={
  pickUp: string,
  drop: string,
  onChange: (p: string, d: string) => void,
  onDistance: (d:number) =>void
}

export default function SearchMap({pickUp, drop, onChange, onDistance}:props) {
  return (
    <div className='relative h-full w-full bg-zinc-100'>
      <MapContainer
        style={{ width: "100%", height: "100%" }}
      />
      <TileLayer attribution='&copy;'/>
    </div>
  )
}
