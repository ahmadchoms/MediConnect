import { availableTimeSlots } from "@/dummy/data";
import { firebaseService } from "@/lib/firebase/service";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useAppointment = (doctors, doctorId) => {
  const [selectedDoctor, setSelectedDoctor] = useState(
    doctorId ? doctors.find((d) => d.id.toString() === doctorId) : null
  );
  const [appointments, setAppointments] = useState([]);
  const [userId, setUserId] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.name) return;

      const userQuery = await firebaseService.queryDocument(
        "users",
        "name",
        session.user.name
      );
      if (userQuery.length > 0) {
        const userDoc = userQuery[0];
        setUserId(userDoc.id);

        const appointmentsData = await firebaseService.getData("appointments");
        setAppointments(
          appointmentsData.filter((app) => app.userId === userDoc.id)
        );
      }
    };

    fetchData();
  }, [session]);

  const getDayName = (date) => {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return days[date.getDay()];
  };

  const isDateAvailable = (date) => {
    if (!selectedDoctor) return false;

    const dayName = getDayName(date);
    const isScheduledDay = selectedDoctor.schedule.some(
      (schedule) => schedule.day === dayName
    );

    const isValidDate = date > new Date() && date.getDay() !== 0;

    return isScheduledDay && isValidDate;
  };

  const getAvailableTimesForDate = (date) => {
    if (!selectedDoctor || !date) return [];

    const dayName = getDayName(date);
    const doctorSchedule = selectedDoctor.schedule.find(
      (schedule) => schedule.day === dayName
    );

    if (!doctorSchedule) return [];

    const [startHour, startMinute] = doctorSchedule.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = doctorSchedule.endTime.split(":").map(Number);

    const startTime = new Date(date);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(date);
    endTime.setHours(endHour, endMinute, 0, 0);

    return availableTimeSlots.filter((timeSlot) => {
      const [slotHour, slotMinute] = timeSlot.split(":").map(Number);
      const slotTime = new Date(date);
      slotTime.setHours(slotHour, slotMinute, 0, 0);

      return slotTime >= startTime && slotTime < endTime;
    });
  };

  return {
    selectedDoctor,
    setSelectedDoctor,
    getDayName,
    isDateAvailable,
    getAvailableTimesForDate,
    appointments,
    userId,
  };
};
