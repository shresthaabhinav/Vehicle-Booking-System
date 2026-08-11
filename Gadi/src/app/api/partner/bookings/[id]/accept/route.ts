import connectDb from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, context:{params:Promise<{id:string}>}){
    try {
        const id = await (context.params).id
        await connectDb()
    } catch (error) {
        
    }
}