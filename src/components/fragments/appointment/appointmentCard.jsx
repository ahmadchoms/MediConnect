"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import handleDownloadInvoice from "@/utils/generateIinvoicePDF";
import { CalendarCheck, MoreHorizontal } from "lucide-react";
import StatusBadge from "./statusBadge";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import AppointmentDetailModal from "./appointmentModal";
import { useEffect, useState } from "react";
import { firebaseService } from "@/lib/firebase/service";

const AppointmentCard = ({ appointment, formatDate }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await firebaseService.getDocumentById("users", appointment.userId);
                setUser(userData);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, [appointment.userId]);
    return (
        <Card className="p-4 md:p-6">
            <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                    <CalendarCheck className="h-6 w-6 text-muted-foreground" />
                    <h2 className="text-lg font-semibold">Janji Temu</h2>
                    <h2 className="text-sm font-medium">{formatDate(appointment.date)}</h2>
                    <h2 className="text-sm font-medium">{appointment.time}</h2>
                    <StatusBadge status={appointment.status} />
                </div>
                <p className="text-xs text-muted-foreground">{appointment.invoice}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shadow-md border-2 border-white">
                            <img
                                src="/dr-budi.jpg"
                                alt="Doctor"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <h3 className="font-medium text-sm md:text-base">{appointment.doctor}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className="flex flex-col space-y-2">
                    <p className="text-lg font-semibold">Alasan Kunjungan</p>
                    <p className="text-sm md:text-base">{appointment.reason}</p>
                </div>

                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="w-full md:flex-1" variant="outline">
                                Lihat Detail Janji Temu
                            </Button>
                        </AlertDialogTrigger>
                        <AppointmentDetailModal appointment={appointment} user={user} />
                    </AlertDialog>

                    <Button className="w-full md:flex-1" onClick={() => handleDownloadInvoice(appointment, user)}>
                        Unduh Invoice Janji Temu
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AppointmentCard;
