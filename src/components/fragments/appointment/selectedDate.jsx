import { motion } from "framer-motion";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Clock, ArrowLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const DateTimeSelectionStep = ({
  form,
  selectedDate,
  availableTimes,
  isDateAvailable,
  setStep,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4 w-full"
    >
      <div className="grid grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pilih Tanggal</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  classNames={{
                    selected: "bg-blue-600 text-white",
                  }}
                  disabled={(date) => !isDateAvailable(date)}
                  className="border rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedDate && availableTimes.length > 0 && (
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pilih Waktu</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={field.value === time ? "default" : "outline"}
                        className={`justify-center text-sm ${field.value === time ? "bg-blue-600" : ""
                          }`}
                        onClick={() => form.setValue("time", time)}
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        {time}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm">
        Tanggal yang tersedia sesuai jadwal dokter.
      </p>
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setStep(1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
        <Button
          type="button"
          onClick={() => setStep(3)}
          disabled={!form.getValues("date") || !form.getValues("time")}
        >
          Lanjutkan
        </Button>
      </div>
    </motion.div>
  );
};

export default DateTimeSelectionStep;
