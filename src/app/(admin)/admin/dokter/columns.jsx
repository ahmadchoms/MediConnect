import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModalLayout } from "@/components/layouts/admin-layout/modal-layout";
import { DeleteConfirmationModal } from "@/components/layouts/admin-layout/modal-delete-layout";
import { useState } from "react";

export const columns = [
  {
    accessorKey: "image",
    header: "Foto",
    cell: ({ row }) => {
      const image = row.original.image;
      return (
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white">
          <img
            src={image}
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "specialty",
    header: "Spesialis",
  },
  {
    accessorKey: "categories",
    header: "Kategori",
    cell: ({ row }) => {
      const categories = row.original.categories;
      return categories.join(", ");
    },
  },
  {
    accessorKey: "schedule",
    header: "Jadwal",
    cell: ({ row }) => {
      const schedule = row.original.schedule;
      return schedule.map((s) => (
        <div key={s.day}>
          {s.day}: {s.time}
        </div>
      ));
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const dokter = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [isEditModalOpen, setIsEditModalOpen] = useState(false);

      const handleDelete = () => {
        console.log(`Menghapus dokter: ${dokter.name} dengan ID: ${dokter.id}`);
        setIsDeleteDialogOpen(false);
      };

      const handleSave = (data) => {
        console.log("Data berhasil disimpan:", data);
        setIsEditModalOpen(false);
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-36 p-2 bg-white rounded-lg shadow-xl border border-gray-100"
            >
              <ModalLayout
                title="Edit Dokter"
                onSave={handleSave}
                content={
                  <div className="grid grid-cols-2 gap-4">
                    {/* disini untuk component form */}
                  </div>
                }
              >
                <div className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors cursor-pointer">
                  <Edit className="h-4 w-4 text-blue-500" />
                  Update
                </div>
              </ModalLayout>

              <div
                className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors cursor-pointer"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash className="h-4 w-4 text-red-500" />
                Delete
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Modal Delete Confirmation */}
          <DeleteConfirmationModal
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleDelete}
            itemName={dokter.name}
            description="Apakah Anda yakin ingin menghapus data dokter ini?"
          />
        </>
      );
    },
  },
];
