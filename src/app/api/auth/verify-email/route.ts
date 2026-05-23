import connectDb from "@/lib/db";

export async function POST(req:Request){
    try{
        await connectDb()
        const {email,otp} = await req.json()
        if (email && !otp) {
              return Response.json(
                { message: "email and otp is required" },
                { status: 400 },
              );
            }
        if(!email && !otp){
            return Response.json(
                { message:"email and otp is required" },
                { status: 400 }
        )
        }
    }catch(error){

    }
}