import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation/auth";
import { firebaseService } from "@/lib/firebase/service";
import { serverTimestamp } from "firebase/firestore";
import bcrypt from "bcryptjs"; // Impor bcryptjs
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/init";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi input dengan registerSchema
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      role,
      phoneNumber,
      nik,
      address,
      gender,
      dateOfBirth,
    } = validationResult.data;

    const emailQuery = await firebaseService.queryDocument(
      "users",
      "email",
      email
    );
    if (emailQuery.length > 0) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const nikQuery = await firebaseService.queryDocument("users", "nik", nik);
    if (nikQuery.length > 0) {
      return NextResponse.json(
        { message: "User with this NIK already exists" },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || "pasien",
      phoneNumber,
      nik,
      address,
      gender,
      dateOfBirth,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    // Simpan user baru ke Firebase
    const docRef = await firebaseService.addDocument("users", newUser);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: docRef.id,
        idUser: userCredential.user.uid,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed", error: error.message }, // Sertakan pesan error
      { status: 500 }
    );
  }
}
