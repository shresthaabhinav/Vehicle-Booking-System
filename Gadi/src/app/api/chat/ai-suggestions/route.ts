import connectDb from "@/lib/db";
import ChatMessage from "@/models/chatMessage.model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const geminiUrl = process.env.GEMINI_API_URL!

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const {lastMessage,role} = await req.json()

    const prompt = `
        You are an AI reply suggestion assistant for a vehicle booking chat application.

        Generate short, smart, human-like quick reply suggestions based on:

        ROLE (DRIVER or USER)
        RECENT_MESSAGE

        Rules:
        1. Generate only ONE reply suggestion.
        2. Keep the reply short and natural, suitable for a real-time vehicle booking chat.
        3. The reply should directly respond to the last message.
        4. Consider the user's role when generating the reply:
        - If the role is "driver", respond as the driver.
        - If the role is "user", respond as the passenger/customer.
        5. Do not mention that you are an AI.
        6. Do not provide explanations, analysis, alternatives, or multiple replies.
        7. Do not use quotation marks around the reply.
        8. Keep the response polite, friendly, and conversational.
        9. Avoid unnecessary formal language.
        10. If the message is about pickup, drop-off, location, ETA, arrival, fare, payment, or the ride status, respond appropriately to that context.
        11. Do not invent specific information such as locations, times, prices, or booking details that are not present in the message.
        12. If the message is unclear, suggest a simple clarification question.
        13. Return only the suggested reply text.

        Output format:
        {
            "suggestions": [
                "Reply 1",
                "Reply 2",
                "Reply 3",
                "Reply 4",
                "Reply 5",
            ]
        }

        Input:
        ROLE: ${role}
        RECENT_MESSAGE: ${lastMessage}
        `;

    const response = await axios.post(geminiUrl,{

    "contents": [
        {
        "parts": [
            {
                "text": `${prompt}`
            }
        ]
    }
    ]
    })

    const suggestions = response.data.candidates[0].content.parts[0].text

        return NextResponse.json(
        suggestions,
        { status: 200 },
        );

  } catch (error) {
      console.log(error)
      return NextResponse.json(
      { message: `get ai suggestions error ${error}` },
      { status: 500 },
    );
  }
}
