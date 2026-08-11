import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
        await connectDb()
        const session = await auth()

        if (!session?.user?.id) {
              return NextResponse.json({ message: "unauthorize" }, { status: 401 });
            }

        const user = await User.findOne({email: session.user.email})

        const booking = await Booking.findOne({
            user: user._id
        })

        if(!booking){
            return NextResponse.json(
              { message: "booking not found" },
              { status: 400 },
            );
        }

        return NextResponse.json(
          booking,
          { status: 400 },
        );
    }catch(error){
        return NextResponse.json(
          { message: `get active booking error ${error}` },
          { status: 500 },
        );
    }
}