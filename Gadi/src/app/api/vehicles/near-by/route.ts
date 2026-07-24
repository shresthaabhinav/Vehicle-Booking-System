import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  try {
    await connectDb()
    const { latitude, longitude, vehicleType } = await req.json()

    if(!latitude || !longitude){
      return NextResponse.json(
        {message: "Coordinates not found"},
        {status: 400}
      )
    }

    const partners = await User.find({
      role: "partner",
      isOnline: true,
      partnerStatus: "approved",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates:[longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    })

    const partnerIds = partners.map(p=>p._id)

    if(partnerIds.length==0){
      return NextResponse.json(
        { message: "Vehicles not found" },
        { status: 200 },
      );
    }

    const vehicles = await Vehicle.find({
      owner: {$in: partnerIds}
    })

  } catch (error) {
    
  }
}