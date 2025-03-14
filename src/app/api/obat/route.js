import { medicationSchema } from "@/lib/validation/medication";
import { NextResponse } from "next/server";
import { firebaseService } from "@/lib/firebase/service";
import { serverTimestamp } from "firebase/firestore";

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = medicationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { name, dosage, frequency, quantity, price } = validationResult.data;

    const newObat = {
      name,
      dosage,
      frequency,
      quantity: Number(quantity),
      price: Number(price),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await firebaseService.addDocument("obat", newObat);
    return NextResponse.json(
      { message: "Obat berhasil ditambahkan", id: docRef.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menambahkan obat", error: error.message },
      { status: 500 }
    );
  }
}
