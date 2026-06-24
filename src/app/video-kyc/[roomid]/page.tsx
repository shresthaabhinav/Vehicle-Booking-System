'use client'
import React, { useEffect, useRef, useState } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { VideoOff } from 'lucide-react'

export default function page() {

    const containerRef = useRef<HTMLDivElement>(null)
    const [ joined, setJoined ] = useState(false)
    const previewRef = useRef<HTMLVideoElement>(null)
    const [ stream, setStream ] = useState<MediaStream | null>()
    const [ isCameraOn, setIsCameraOn ] = useState(true)
    const [ isMicOn, setIsMicOn ] = useState(true)

    useEffect(()=>{
        if(joined) return
        let localstream:MediaStream
        const init=async ()=>{
            try{
                localstream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                })
                setStream(localstream)
                if(previewRef.current){
                    previewRef.current.srcObject = localstream
                }
            }catch(error){
                console.log(error)
            }
        }
        init()
    },[])

    const toggleCamera = () =>{
        if(!stream) return
        stream.getVideoTracks().forEach((track)=>track.enabled=!isCameraOn)
        setIsCameraOn(!isCameraOn)
    }

    const toggleMic = () =>{
        if(!stream) return
        stream.getAudioTracks().forEach((track)=>track.enabled=!isMicOn)
        setIsMicOn(!isMicOn)
    }

    const { userData } = useSelector((state:RootState)=>state.user)
    const startCall= async()=>{
    if(!containerRef){
        return null
    }
    try{
        const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID)
        const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret!,
            "shrestha",
            userData?._id.toString()!,
            "abhinav"
        )
        const zp = ZegoUIKitPrebuilt.create(kitToken)

        zp.joinRoom({
            container: containerRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView:false
        });
        setJoined(true)
    }catch(error){
        console.log(error)
    }
  }
  return (
    <div className='min-h-screen bg-black text-white flex flex-col'>
        <div className='px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
                <Image src={"/logo.png"} alt="logo" width={44} height={44} priority />
                <p className='text-xs text-gray-400'>{userData?.role=="admin"?"Admin Verification":"Partner Video KYC"}</p>
            </div>
        </div>
        <div className='flex-1 relative'>
            {!joined && (
                <div className='h-full flex itmes-center justify-center px-4 py-10'>
                    <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
                        <div className='relative rounded-2xl overflow-hidden border border-white/10 bg-white/5'>
                        <video 
                            ref={previewRef} 
                            autoPlay
                            muted
                            playsInline
                            className='w-full h-[300px] sm:h-[400px] object-cover'
                            />
                            {!isCameraOn && (
                                <div className='absolute inset-0 bg-black flex items-center justify-center'>
                                    <VideoOff size={40}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}
