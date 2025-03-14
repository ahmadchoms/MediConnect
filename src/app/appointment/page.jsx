"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { appointmentFormSchema } from "@/lib/validation/appointment";
import { useAppointment } from "@/hooks/useAppointment";
import DoctorSelectionStep from "@/components/fragments/appointment/selectedDocter";
import DateTimeSelectionStep from "@/components/fragments/appointment/selectedDate";
import AppointmentConfirmationStep from "@/components/fragments/appointment/formConfirmation";
import { doctors } from "@/dummy/data";
import { SuccessMessage } from "@/components/fragments/appointment/cardSuccessMessage";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StepBadge from "@/components/fragments/appointment/stepBadge";
import HeroSection from "@/components/fragments/heroSection";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import SkeletonUserLoading from "@/components/fragments/skeletonUserLoading";
import { firebaseService } from "@/lib/firebase/service";

export default function AppointmentPage() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctor") || "";

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession()
  const patientName = session?.user?.name

  const {
    selectedDoctor,
    setSelectedDoctor,
    isDateAvailable,
    getAvailableTimesForDate,
  } = useAppointment(doctors, doctorId);

  const form = useForm({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      doctorId: doctorId || "",
      date: undefined,
      time: "",
      reason: "",
    },
  });

  useEffect(() => {
    const fetchUserId = async () => {
      if (!session?.user?.name) return;

      const querySnapshot = await firebaseService.queryDocument("users", "name", session.user.name);

      if (querySnapshot.length !== 0) {
        const userDoc = querySnapshot[0];
        setUserId(userDoc.id);
      }
    };

    fetchUserId();
  }, [session]);

  const selectedDate = form.watch("date");
  const availableTimes = selectedDate ? getAvailableTimesForDate(selectedDate) : [];

  const handleDoctorChange = (value) => {
    const doctor = doctors.find((d) => d.id.toString() === value);
    setSelectedDoctor(doctor);
    form.setValue("doctorId", value);
  };

  const handleRequestAppointment = async (data) => {
    setError("");

    try {
      const appointmentPayload = {
        doctor: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        date: selectedDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }),
        time: data.time,
        reason: data.reason,
        userId,
        appointmentFee: selectedDoctor.appointmentFee,
      };

      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentPayload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "An error occurred");
      }

      toast.success("Janji berhasil dibuat!", {
        description: `Tunggu konfirmasi dari dokter ${selectedDoctor.name}`,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (status === "loading") return <SkeletonUserLoading />

  return (
    <main>
      <HeroSection title="Buat Janji Dengan Dokter Kami">
        Lakukan reservasi untuk konsultasi dengan dokter pilihan Anda dengan mudah dan cepat.
      </HeroSection>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Form Reservasi</CardTitle>
                    <div className="flex gap-1 text-sm">
                      <StepBadge step={step} many={1} />
                      <StepBadge step={step} many={2} />
                      <StepBadge step={step} many={3} />
                    </div>
                  </div>
                  <CardDescription>
                    {step === 1 && "Pilih dokter dan jadwal kunjungan"}
                    {step === 2 && "Pilih tanggal dan waktu kunjungan"}
                    {step === 3 && "Lengkapi informasi pribadi Anda"}
                    {error && <p className="text-red-500">{error}</p>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleRequestAppointment)}
                      className="space-y-6"
                    >
                      {step === 1 && (
                        <DoctorSelectionStep
                          form={form}
                          doctors={doctors}
                          selectedDoctor={selectedDoctor}
                          handleDoctorChange={handleDoctorChange}
                          setStep={setStep}
                        />
                      )}

                      {step === 2 && (
                        <DateTimeSelectionStep
                          form={form}
                          selectedDate={selectedDate}
                          availableTimes={availableTimes}
                          isDateAvailable={isDateAvailable}
                          setStep={setStep}
                        />
                      )}

                      {step === 3 && (
                        <AppointmentConfirmationStep
                          form={form}
                          selectedDoctor={selectedDoctor}
                          selectedDate={selectedDate}
                          setStep={setStep}
                        />
                      )}
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <SuccessMessage />
          )}
        </div>
      </section>
    </main>
  );
}