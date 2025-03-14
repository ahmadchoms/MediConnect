import { z } from "zod";

export const updateRegisterSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  nik: z.string().length(16, "NIK harus terdiri dari 16 digit"),
  dateOfBirth: z.string().nullable(),
  gender: z.enum(["male", "female"]),
  address: z.string().min(1, "Alamat harus diisi"),
  phoneNumber: z.string().min(1, "Nomor telepon harus diisi"),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  confirmPassword: z
    .string()
    .optional()
    .refine((val, ctx) => {
      if (val && ctx.parent.password && val !== ctx.parent.password) {
        return false;
      }
      return true;
    }, "Konfirmasi password harus sama"),
});
