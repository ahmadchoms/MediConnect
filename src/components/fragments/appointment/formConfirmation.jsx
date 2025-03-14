import { motion } from "framer-motion";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CalendarDays, Clock, ArrowLeft, BadgeDollarSign, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toRupiah } from "@/utils/formatToRupiah";

const AppointmentConfirmationStep = ({
  form,
  selectedDoctor,
  selectedDate,
  setStep,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Detail Janji:</h3>
        <div className="space-y-2">
          <div className="flex gap-2 items-center text-sm">
            <Stethoscope className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">Dokter:</span>
            <span className="text-gray-900">{selectedDoctor?.name}</span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">Tanggal:</span>
            <span className="text-gray-900">
              {selectedDate?.toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">Waktu:</span>
            <span className="text-gray-900">{form.getValues("time")} WIB</span>
          </div>
          <div className="flex gap-2 items-center text-sm">
            <BadgeDollarSign className="h-4 w-4 text-blue-600" />
            <span className="text-gray-700">Tagihan Janji Temu:</span>
            <span className="text-gray-900">{toRupiah(selectedDoctor?.appointmentFee)}</span>
          </div>
        </div>
      </div>

      <FormField
        control={form.control}
        name="reason"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alasan Kunjungan</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Jelaskan secara singkat alasan Anda berkonsultasi dengan dokter"
                className="min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setStep(2)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <Button type="submit">Konfirmasi Janji</Button>
      </div>
    </motion.div>
  );
};

export default AppointmentConfirmationStep;
