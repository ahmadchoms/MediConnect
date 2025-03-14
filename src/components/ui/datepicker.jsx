"use client";

import * as React from "react";
import { format } from "date-fns";
import { id, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePicker({ value, onChange, locale = "en" }) {
  const [date, setDate] = React.useState(value);
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  const handleMonthChange = (selectedMonth) => {
    setMonth(Number(selectedMonth));
  };

  const handleYearChange = (selectedYear) => {
    setYear(Number(selectedYear));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "dd MMMM yyyy", { locale: locale === "id" ? id : enUS })
          ) : (
            <span>Pilih Tanggal Lahir</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="flex space-x-2 mb-2">
          <Select
            onValueChange={handleMonthChange}
            defaultValue={month.toString()}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[...Array(12)].map((_, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {format(new Date(2023, index, 1), "MMMM", {
                      locale: locale === "id" ? id : enUS,
                    })}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={handleYearChange}
            defaultValue={year.toString()}
          >
            <SelectTrigger className="w-24">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[...Array(100)].map((_, index) => {
                  const y = new Date().getFullYear() - index;
                  return (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          month={new Date(year, month)}
          fromYear={1900}
          toYear={new Date().getFullYear()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
