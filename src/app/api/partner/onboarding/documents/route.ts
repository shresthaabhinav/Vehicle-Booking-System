import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    try{
        await connectDb()

        const session = await auth()

        if(!session || !session.user?.email){
            return Response.json({ message: "unauthorized"}
                ,{ status: 400 }
            )
        }

        const user = await User.findOne({ email: session.user.email })

        if(!user){
            return Response.json({ message: "user not found"}
                ,{ status: 400 }
            )
        }

        const formData = await req.formData()

        const citizenship = formData.get("citizen") as Blob | null

        const citizenship = formData.get("citizen") as Blob | null

    } catch(error){

    }
}