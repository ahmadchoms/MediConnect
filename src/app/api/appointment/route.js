import { NextResponse } from "next/server";
import { firebaseService } from "@/lib/firebase/service";
import { serverTimestamp } from "firebase/firestore";
import { requestAppointmentSchema } from "@/lib/validation/appointment";

const generateInvoiceNumber = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `INV-${year}${month}${day}-${random}`;
};

export async function POST(request) {
  try {
    const body = await request.json();

    const validationResult = requestAppointmentSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const invoiceNumber = generateInvoiceNumber();

    const { appointmentFee, date, doctor, reason, specialty, time, userId } =
      validationResult.data;

    const newAppointmentRequest = {
      appointmentFee,
      handlingFee: 20000,
      date,
      doctor,
      userId,
      reason,
      specialty,
      time,
      medicationFee: 0,
      status: "waiting",
      invoice: invoiceNumber,
      prescription: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await firebaseService.addDocument(
      "appointments",
      newAppointmentRequest
    );

    return NextResponse.json(
      {
        message: "New request appointment added successfully",
        appointmentId: docRef.id,
        invoiceNumber: invoiceNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending the appointment:", error);
    return NextResponse.json(
      { message: "Ada kesalahan ketika melakukan permintaan janji" },
      { status: 500 }
    );
  }
}
