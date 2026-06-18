import { auth } from '@/auth';
import connectDb from '@/lib/db';
import User from '@/models/user.model';
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest,
    context: { params: Promise<{ id: string }>}) {
        try{
              const session = await auth();
              if (
                !session ||
                !session.user?.email ||
                session.user.role !== "admin"
              ) {
                return Response.json(
                  { message: "unauthorized" },
                  { status: 400 },
                );
              }
              await connectDb();
              const partnerId = (await context.params).id;
              const partner = await User.findById(partnerId);

              if (!partner || partner.role !== "partner") {
                return Response.json(
                  { message: "partner not found" },
                  { status: 400 },
                );
              }
        }catch(error){

        }
    

}
