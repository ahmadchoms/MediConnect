// DeleteConfirmationModal.jsx
"use client";

import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Hapus Data",
  description = "Apakah Anda yakin ingin menghapus data",
  itemName,
  cancelText = "Batal",
  confirmText = "Hapus",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white p-0 overflow-hidden max-w-md">
        <div className="p-6">
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="mt-3 text-center text-lg font-semibold text-gray-900">
              {title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-center text-gray-500">
            {description}
            {itemName && (
              <span className="font-medium text-gray-900"> {itemName}?</span>
            )}
          </AlertDialogDescription>
        </div>
        <AlertDialogFooter className="flex flex-row justify-end space-x-2 bg-white px-6 py-4">
          <AlertDialogCancel className="mt-0 px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
