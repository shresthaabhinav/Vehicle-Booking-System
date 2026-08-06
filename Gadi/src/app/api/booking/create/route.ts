import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
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
      pickupAddress,
      dropAddress,
      pickupLocation,
      dropLocation,
      fare,
      mobileNumber,
    } = await req.json();

    if (
      !driverId ||
      !vehicleId ||
      !pickupLocation.coordinates ||
      !dropLocation.coordinates
    ) {
      return NextResponse.json(
        { message: "missing required details" },
        { status: 400 },
      );
    }

    const driver = await User.findById(driverId);
    if (!driver) {
      return NextResponse.json(
        { message: "driver not found" },
        { status: 400 },
      );
    }
  } catch (error) {
    
  }
}
