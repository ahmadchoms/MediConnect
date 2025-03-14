"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, // Tambahkan ini
} from "@/components/ui/dialog";

export const ModalLayout = ({ title, isOpen, onClose, children, trigger }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm font-medium">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
