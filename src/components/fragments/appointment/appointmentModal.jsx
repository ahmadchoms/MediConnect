import {
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import StatusBadge from "./statusBadge";
import { Calendar, Clock, FileText, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import handleDownloadInvoice from "@/utils/generateIinvoicePDF";
import { toRupiah } from "@/utils/formatToRupiah";

const AppointmentDetailModal = ({ appointment, user }) => {
    if (!appointment) return null;

    const totalFee = appointment.appointmentFee + appointment.handlingFee + appointment.medicationFee;

    return (
        <AlertDialogContent className="max-w-md space-y-4">
            <AlertDialogHeader>
                <div className="flex justify-between">
                    <AlertDialogTitle className="text-lg font-semibold">Detail Janji Temu</AlertDialogTitle>
                    <span className="text-sm text-gray-500">{appointment.invoice}</span>
                </div>
            </AlertDialogHeader>

            <div className="space-y-4">
                <StatusBadge status={appointment.status} />

                <div className="flex items-center space-x-3">
                    <Stethoscope className="text-gray-500" />
                    <div>
                        <div className="font-semibold">{appointment.doctor}</div>
                        <div className="text-xs text-gray-500">{appointment.specialty}</div>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <Calendar className="text-gray-500" />
                    <span className="font-semibold">{appointment.date}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <Clock className="text-gray-500" />
                    <span className="font-semibold">{appointment.time}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <FileText className="text-gray-500" />
                    <span className="text-sm text-gray-500">{appointment.reason}</span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Biaya Konsultasi:</span>
                        <span className="font-medium text-sm">{toRupiah(appointment.appointmentFee)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Biaya Prosedur:</span>
                        <span className="font-medium text-sm">{toRupiah(appointment.handlingFee)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Biaya Obat:</span>
                        <span className="font-medium text-sm">{toRupiah(appointment.medicationFee)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 border-t border-gray-300 pt-2">
                        <span className="text-sm text-gray-500">Total Biaya:</span>
                        <span className="font-medium text-sm">{toRupiah(totalFee)}</span>
                    </div>
                </div>
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel>Tutup</AlertDialogCancel>
                <Button onClick={() => handleDownloadInvoice(appointment, user)}>
                    Cetak Invoice
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    );
};

export default AppointmentDetailModal;