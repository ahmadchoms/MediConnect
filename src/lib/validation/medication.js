import { z } from "zod";

// Schema untuk satu obat
export const medicationSchema = z.object({
  name: z.string().min(1, { message: "Nama obat harus diisi" }), // Nama obat, harus string dan tidak boleh kosong
  dosage: z.string().min(1, { message: "Dosis harus diisi" }), // Dosis, harus string dan tidak boleh kosong
  frequency: z.string().min(1, { message: "Frekuensi harus diisi" }), // Frekuensi, harus string dan tidak boleh kosong
  quantity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number()
      .int()
      .positive({ message: "Quantity harus bilangan bulat positif" })
  ), // Quantity, harus bilangan bulat positif
  price: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().positive({ message: "Harga harus bilangan positif" })
  ), // Harga, harus bilangan positif
});
