import { NextResponse } from "next/server";
import { firebaseService } from "@/lib/firebase/service";
import { serverTimestamp } from "firebase/firestore";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    const newContactMessage = {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    };

    const docRef = await firebaseService.addDocument(
      "contact",
      newContactMessage
    );

    return NextResponse.json(
      { message: "New contact message added successfully", userId: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { message: "An error occurred while sending the message" },
      { status: 500 }
    );
  }
}
