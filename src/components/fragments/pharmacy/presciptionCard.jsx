"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, DollarSign } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const PrescriptionCard = ({ prescription }) => {
    const [showDetails, setShowDetails] = useState(false);

    const totalMedicationCost = prescription.medications.reduce(
        (total, med) => total + med.price * med.quantity,
        0
    );

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center space-x-2">
                        <Pill className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-lg font-semibold">Resep Dokter</h2>
                    </div>
                    <span className="text-sm text-muted-foreground">
                        {prescription.prescriptionNumber}
                    </span>
                </CardHeader>

                <CardContent>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white">
                                <img
                                    src={prescription.doctorImage || "/default-doctor.jpg"}
                                    alt="Doctor"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-medium text-sm">{prescription.doctorName}</h3>
                                <div className="text-xs text-muted-foreground">
                                    {prescription.specialty}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium">Total:</div>
                            <div className="text-sm font-bold">
                                Rp {totalMedicationCost.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setShowDetails(true)}
                        >
                            Lihat Detail
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="pt-0">
                    <span className="text-xs text-muted-foreground">
                        Tanggal Resep: {prescription.prescriptionDate}
                    </span>
                </CardFooter>
            </Card>

            <AlertDialog open={showDetails} onOpenChange={setShowDetails}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <Pill className="mr-2 h-5 w-5" />
                            Detail Resep {prescription.prescriptionNumber}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="space-y-4 mt-2">
                                <div className="flex items-center space-x-3">
                                    <div className="w-16 h-16 rounded-full overflow-hidden shadow-md border-2 border-white">
                                        <img
                                            src={prescription.doctorImage || "/default-doctor.jpg"}
                                            alt="Doctor"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">{prescription.doctorName}</h3>
                                        <div className="text-sm text-muted-foreground">
                                            {prescription.specialty}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t pt-3">
                                    <h4 className="text-base font-semibold mb-2 flex items-center">
                                        <Pill className="mr-2 h-4 w-4" />
                                        Daftar Obat
                                    </h4>
                                    {prescription.medications.map((medication, medIndex) => (
                                        <div
                                            key={medIndex}
                                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                                        >
                                            <div>
                                                <div className="text-sm font-medium">{medication.name}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {medication.dosage} - {medication.frequency}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm">
                                                    {medication.quantity} x Rp {medication.price.toLocaleString()}
                                                </div>
                                                <div className="text-xs">
                                                    Rp {(medication.quantity * medication.price).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-3">
                                    <h4 className="text-base font-semibold mb-2 flex items-center">
                                        <DollarSign className="mr-2 h-4 w-4" />
                                        Rincian Biaya
                                    </h4>
                                    <div className="space-y-1">
                                        {prescription.medications.map((medication, medIndex) => (
                                            <div key={medIndex} className="flex justify-between text-sm">
                                                <span>{medication.name}</span>
                                                <span>
                                                    Rp {(medication.quantity * medication.price).toLocaleString()}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                                            <span>Total Biaya Obat</span>
                                            <span>Rp {totalMedicationCost.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between text-xs text-muted-foreground pt-2">
                                    <span>Tanggal Resep: {prescription.prescriptionDate}</span>
                                    <span>Valid hingga: {prescription.validUntil}</span>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction>Tutup</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};