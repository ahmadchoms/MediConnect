import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/card";
import { PaginationLayout } from "./pagination-layout";
import { SearchInput } from "@/components/fragments/admin/searchInput";
import { DataTable } from "./table-layout";

export const CardLayout = ({
  title,
  description,
  columns,
  data,
  itemsPerPage,
  searchPlaceholder = "Cari...",
  searchFields = [],
  content,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) => {
    if (searchFields.length === 0) {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return searchFields.some((field) =>
      String(item[field]).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Card className="shadow-md border-gray-200">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600 mt-1">
              {description}
            </CardDescription>
          </div>
          <SearchInput
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {content}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <DataTable
          columns={columns}
          data={filteredData}
          className="border-collapse"
        />
      </CardContent>
    </Card>
  );
};
