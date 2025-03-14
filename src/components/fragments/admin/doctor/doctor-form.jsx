import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { doctorSchema } from "@/lib/validation/doctor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Loader2 } from "lucide-react";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const availableTimeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];

const specialties = [
  { value: "anak", label: "Anak" },
  { value: "gigi", label: "Gigi" },
  { value: "kandungan", label: "Kandungan (Obstetri & Ginekologi)" },
  { value: "mata", label: "Mata" },
  { value: "tht", label: "Telinga, Hidung, Tenggorokan (THT)" },
  { value: "kulit", label: "Kulit & Kelamin" },
  { value: "saraf", label: "Saraf" },
  { value: "dalam", label: "Penyakit Dalam" },
  { value: "paru", label: "Paru" },
  { value: "jantung", label: "Jantung & Pembuluh Darah" },
  { value: "gizi", label: "Gizi Klinik" },
  { value: "psikologi", label: "Psikologi Klinis" },
  { value: "fisioterapi", label: "Fisioterapi" },
  { value: "rehabilitasi", label: "Rehabilitasi Medik" },
];

export function DoctorFormModal({
  isOpen,
  onOpenChange,
  doctor,
  onSave,
  isSubmitting = false,
  onEdit,
}) {
  const form = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      categories: "general",
      specialty: "",
      appointmentFee: 0,
      schedule: [{ day: "", startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  useEffect(() => {
    if (isOpen) {
      if (doctor) {
        const categoryValue = Array.isArray(doctor.categories)
          ? doctor.categories[0]
          : doctor.categories;

        const specialtyValue =
          categoryValue === "specialist"
            ? specialties.find((s) => s.value === doctor.specialty)?.value || ""
            : "";

        const scheduleArray = doctor.schedule.map((item) => ({
          day: item.day,
          startTime: item.startTime,
          endTime: item.endTime,
        }));

        form.reset({
          name: doctor.name,
          categories: categoryValue,
          specialty: specialtyValue,
          appointmentFee: doctor.appointmentFee || 0,
          schedule: scheduleArray.length
            ? scheduleArray
            : [{ day: "", startTime: "", endTime: "" }],
        });
      } else {
        form.reset({
          name: "",
          categories: "general",
          specialty: "",
          appointmentFee: 0,
          schedule: [{ day: "", startTime: "", endTime: "" }],
        });
      }
    }
  }, [isOpen, doctor, form]);

  const onSubmit = (data) => {
    const formattedSchedule = data.schedule.map((item) => ({
      day: item.day,
      startTime: item.startTime,
      endTime: item.endTime,
    }));

    const saveData = {
      ...data,
      schedule: formattedSchedule,
    };

    if (doctor) {
      onEdit(saveData);
    } else {
      onSave(saveData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {doctor ? "Edit Data Dokter" : "Tambah Dokter Baru"}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-150px)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="info">Informasi Dokter</TabsTrigger>
                  <TabsTrigger value="schedule">Jadwal Praktik</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap</FormLabel>
                          <FormControl>
                            <Input placeholder="Nama dokter" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="categories"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kategori</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">Umum</SelectItem>
                                <SelectItem value="specialist">
                                  Spesialis
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialty"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spesialisasi</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={
                                form.watch("categories") !== "specialist"
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih spesialisasi" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {specialties.map((specialty) => (
                                  <SelectItem
                                    key={specialty.value}
                                    value={specialty.value}
                                  >
                                    {specialty.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="appointmentFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Biaya Konsultasi (Rp)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Biaya konsultasi"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">Jadwal Praktik</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          append({ day: "", startTime: "", endTime: "" })
                        }
                      >
                        <Plus className="h-4 w-4 mr-1" /> Tambah Jadwal
                      </Button>
                    </div>

                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex flex-col md:flex-row gap-3 items-start p-3 border rounded-md bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                          <FormField
                            control={form.control}
                            name={`schedule.${index}.day`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Hari</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Pilih hari" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {days.map((day) => (
                                      <SelectItem key={day} value={day}>
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`schedule.${index}.startTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Mulai</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Jam mulai" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableTimeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`schedule.${index}.endTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">
                                  Selesai
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Jam selesai" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {availableTimeSlots
                                      .filter(
                                        (time) =>
                                          !form.watch(
                                            `schedule.${index}.startTime`
                                          ) ||
                                          time >
                                          form.watch(
                                            `schedule.${index}.startTime`
                                          )
                                      )
                                      .map((time) => (
                                        <SelectItem key={time} value={time}>
                                          {time}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="h-8 w-8 mt-6"
                          onClick={() => fields.length > 1 && remove(index)}
                          disabled={fields.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => onOpenChange(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-500"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {doctor ? "Memperbarui..." : "Menyimpan..."}
                    </>
                  ) : doctor ? (
                    "Perbarui Dokter"
                  ) : (
                    "Tambah Dokter"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
