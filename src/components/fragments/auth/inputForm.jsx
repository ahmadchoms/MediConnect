import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { availableTimeSlots } from "@/dummy/data";
import { Textarea } from "@/components/ui/textarea";

const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export const FormSchedule = ({ id, label, register, errors }) => {
  const [schedule, setSchedule] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: "", startTime: "", endTime: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor={id}>{label}</Label>

      {schedule.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Select onValueChange={(value) => handleChange(index, "day", value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Hari" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleChange(index, "startTime", value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Mulai" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableTimeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleChange(index, "endTime", value)}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Selesai" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {availableTimeSlots
                  .filter((time) => time > item.startTime) // Jam akhir harus lebih besar dari jam awal
                  .map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleRemoveSchedule(index)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={handleAddSchedule}>
        + Tambah Jadwal
      </Button>

      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </div>
  );
};
export const FormDatePicker = ({ id, label, value, onChange, errors }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <DatePicker value={value} onChange={onChange} />
    {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
  </div>
);

export const FormInput = ({
  id,
  label,
  type,
  placeholder,
  register,
  errors,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type={type} placeholder={placeholder} {...register(id)} />
    {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
  </div>
);

export const FormImage = ({ id, label, register, errors }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input
      id={id}
      type="file"
      accept="image/jpeg, image/png"
      {...register(id, {
        validate: (fileList) => {
          const file = fileList[0];
          if (!file) return "File harus diunggah";
          const allowedTypes = ["image/jpeg", "image/png"];
          return allowedTypes.includes(file.type)
            ? true
            : "Format harus JPG atau PNG";
        },
      })}
    />
    {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
  </div>
);

export const FormSelect = ({ id, label, options, setValue, watch, errors }) => {
  // Gunakan watch untuk mendapatkan nilai yang dipilih
  const selectedValue = watch(id);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={selectedValue} // Nilai yang dipilih
        onValueChange={(value) => setValue(id, value)} // Update nilai saat berubah
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Pilih ${label}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {errors[id] && (
        <p className="text-sm text-red-500">{errors[id].message}</p>
      )}
    </div>
  );
};

export const FormSpesialis = ({
  id,
  label,
  options,
  register,
  errors,
  disabled,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Select {...register(id)} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
  </div>
);
export const FormTextArea = ({ id, label, placeholder, register, errors }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Textarea
      id={id}
      placeholder={placeholder}
      {...register(id)}
      className="w-full"
    />
    {errors[id] && <p className="text-sm text-red-500">{errors[id].message}</p>}
  </div>
);
