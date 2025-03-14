import { NextResponse } from "next/server";
import { serverTimestamp } from "firebase/firestore";
import { firebaseService } from "@/lib/firebase/service";
import { doctorSchema } from "@/lib/validation/doctor";

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = doctorSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const docRef = await firebaseService.addDocument("doctors", {
      ...validationResult.data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      {
        message: "Dokter berhasil ditambahkan",
        doctorId: docRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding doctor:", error);
    return NextResponse.json(
      { message: "Gagal menambahkan dokter" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID dokter wajib diisi" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validationResult = doctorSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    await firebaseService.updateDocument("doctors", id, validationResult.data);

    return NextResponse.json(
      {
        message: "Dokter berhasil diperbarui",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui dokter" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID dokter wajib diisi" },
        { status: 400 }
      );
    }

    await firebaseService.deleteDocument("doctors", id);

    return NextResponse.json(
      {
        message: "Dokter berhasil dihapus",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json(
      { message: "Gagal menghapus dokter" },
      { status: 500 }
    );
  }
}
