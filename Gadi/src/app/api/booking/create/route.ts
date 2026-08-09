import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Booking from "@/models/booking.model";
import User from "@/models/user.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ message: "unauthorize" }, { status: 401 });
    }

    const {
      driverId,
      vehicleId,
      pickUpAddress,
      dropAddress,
      pickUpLocation,
      dropLocation,
      fare,
      mobileNumber,
    } = await req.json();

    if (
      !driverId ||
      !vehicleId ||
      !pickUpLocation.coordinates ||
      !dropLocation.coordinates
    ) {
      return NextResponse.json(
        { message: "missing required details" },
        { status: 400 },
      );
    }

    const userId = new mongoose.Schema.Types.ObjectId(session.user.id)

    const driver = await User.findById(driverId);
    if (!driver) {
      return NextResponse.json(
        { message: "driver not found" },
        { status: 400 },
      );
    }

    const existing = await Booking.findOne({
      user: userId,
      status: {
        $in: ["requested", "awaiting_payment", "confirmed", "started"],
      },
    });

    if(existing){
      return NextResponse.json(
        existing
      );
    }

    const booking = await Booking.create({
        user: session.user.id.toString(),
        driver,
        vehicle: vehicleId,
        pickUpAddress,
        dropAddress,
        pickUpLocation,
        dropLocation,
        fare,
        userMobileNumber: mobileNumber,
        driverMobileNumber: driver.mobileNumber,
        bookingStatus: "requested",
    });

      return NextResponse.json(
        booking, {status: 200}
      );

  } catch (error) {
    return NextResponse.json(
      {message: `create booking error ${error}`},
      {status: 500}
    );
  }
}
