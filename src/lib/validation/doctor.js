import { z } from "zod";

export const doctorSchema = z
  .object({
    name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
    categories: z.string(),
    specialty: z.string().optional().or(z.literal("")),
    appointmentFee: z.number().min(0, { message: "Biaya tidak boleh negatif" }),
    schedule: z
      .array(
        z.object({
          day: z.string().nonempty("Hari harus dipilih"),
          startTime: z.string().nonempty("Jam mulai harus dipilih"),
          endTime: z.string().nonempty("Jam selesai harus dipilih"),
        })
      )
      .min(1, { message: "Minimal satu jadwal harus diisi" }),
  })
  .refine(
    (data) => {
      // Jika kategori spesialis, maka speciality harus diisi
      if (data.categories === "specialist") {
        return !!data.specialty;
      }
      return true;
    },
    {
      message: "Spesialisasi harus dipilih untuk dokter spesialis",
      path: ["specialty"],
    }
  );
