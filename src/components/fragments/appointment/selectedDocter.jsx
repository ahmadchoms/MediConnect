import { Button } from "@/components/ui/button";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const DoctorSelectionStep = ({
  form,
  doctors,
  selectedDoctor,
  handleDoctorChange,
  setStep,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <FormField
        control={form.control}
        name="doctorId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pilih Dokter</FormLabel>
            <Select value={field.value} onValueChange={handleDoctorChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih dokter yang ingin Anda temui" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id.toString()}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedDoctor && (
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <h3 className="font-medium mb-2">Jadwal Praktik:</h3>
          <div className="space-y-1">
            {selectedDoctor.schedule.map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center text-sm">
                <CalendarDays className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">{item.day}:</span>
                <span className="text-gray-900">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="button"
        className="w-full mt-6"
        onClick={() => setStep(2)}
        disabled={!selectedDoctor}
      >
        Lanjutkan
      </Button>
    </motion.div>
  );
};

export default DoctorSelectionStep;
