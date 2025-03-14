"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash, Edit, Calendar, Clock, User, Award } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function DoctorCard({ doctor, index, onEdit, onDelete }) {
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

    const handleDeleteConfirm = () => {
        onDelete(doctor.id);
        setIsDeleteAlertOpen(false);
    };

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

    const capsSpecialty = specialties.find((caps) => caps.value === doctor.specialty);
    const displaySpecialty = capsSpecialty ? capsSpecialty.label : doctor.specialty;

    return (
        <motion.div
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                    src={"/dr-budi.jpg"}
                    alt={doctor.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1 z-20">
                    {doctor.categories.includes("specialist") ? "Spesialis" : "Umum"}
                </Badge>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
                            {doctor.name}
                        </h3>
                        <div className="flex items-center gap-1 text-blue-600">
                            <p className="font-medium">{displaySpecialty}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-5">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                        Jadwal Praktik
                    </h4>
                    <div className="space-y-2">
                        {doctor.schedule.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm bg-white p-2 rounded border border-gray-100">
                                <span className="text-gray-700 font-medium">{item.day}</span>
                                <span className="text-gray-900 text-sm font-medium flex items-center">
                                    <Clock className="h-3 w-3 mr-1 text-blue-500" />
                                    {item.startTime} - {item.endTime}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                    <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        onClick={() => onEdit(doctor)}
                    >
                        <Edit className="h-4 w-4 mr-2" /> Edit
                    </Button>

                    <AlertDialog
                        open={isDeleteAlertOpen}
                        onOpenChange={setIsDeleteAlertOpen}
                    >
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 transition-colors"
                            >
                                <Trash className="h-4 w-4 mr-2" /> Hapus
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini akan menghapus data dokter secara permanen dan
                                    tidak dapat dikembalikan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={handleDeleteConfirm}
                                >
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </motion.div>
    );
}