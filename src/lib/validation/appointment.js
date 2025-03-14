const { z } = require("zod");

export const appointmentFormSchema = z.object({
  doctorId: z.string().min(1, { message: "Silakan pilih dokter" }),
  date: z.date({
    required_error: "Silakan pilih tanggal janji",
  }),
  time: z.string().min(1, { message: "Silakan pilih waktu kunjungan" }),
  reason: z.string().min(10, {
    message: "Silakan berikan alasan kunjungan minimal 10 karakter",
  }),
});

export const requestAppointmentSchema = z.object({
  doctor: z.string().min(1, "Nama dokter wajib diisi"),
  specialty: z.string().min(1, "Spesialisasi wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  time: z.string().min(1, "Waktu wajib diisi"),
  reason: z.string().min(1, "Alasan wajib diisi"),
  appointmentFee: z.number().min(0, "Biaya janji temu tidak boleh negatif"),
  userId: z.string().min(1, "ID pengguna wajib diisi"),
});
