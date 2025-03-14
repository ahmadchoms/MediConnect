import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchInput = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        className="pl-10 w-full md:w-96"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
