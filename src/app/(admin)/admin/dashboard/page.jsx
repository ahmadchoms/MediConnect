"use client";

import SidebarLayout from "@/components/layouts/admin-layout/sidebar-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Calendar, Stethoscope, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useSession } from "next-auth/react";
import CardDashboard from "@/components/fragments/admin/cardDashboard";
import {
  format,
  subDays,
  subMonths,
  subYears,
  parseISO,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  getMonth,
  getYear,
} from "date-fns";
import { id } from "date-fns/locale";
import { firebaseService } from "@/lib/firebase/service";
import { CardLayout } from "@/components/layouts/admin-layout/card-layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [statisticsData, setStatisticsData] = useState({
    daily: [],
    monthly: [],
    yearly: [],
  });
  const today = format(new Date(), "d MMMM yyyy", { locale: id });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await firebaseService.getData("appointments");
        setAppointments(appointments);

        const doctors = await firebaseService.getData("doctors");
        setDoctors(doctors);

        const usersData = await firebaseService.getData("users");
        setUsers(usersData);

        // Filter users to only those with role "pasien"
        const patientsData = usersData.filter((user) => user.role === "pasien");
        setPatients(patientsData);

        // Generate statistics from patients data only
        generateStatistics(appointments, patientsData);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Generate real statistics from Firebase data
  const generateStatistics = (appointmentsData, patientsData) => {
    // 1. Daily statistics (last 10 days) - Only count patient registrations
    const dailyStats = [];
    const now = new Date();

    for (let i = 9; i >= 0; i--) {
      const targetDay = subDays(now, i);
      const targetDayStr = format(targetDay, "d");
      const targetDayFormatted = format(targetDay, "yyyy-MM-dd");

      // Count patients registered on this day
      const dayPatients = patientsData.filter((patient) => {
        if (!patient.createdAt || !patient.createdAt.seconds) return false;
        const regDate = new Date(patient.createdAt.seconds * 1000);
        return format(regDate, "yyyy-MM-dd") === targetDayFormatted;
      });

      dailyStats.push({
        name: targetDayStr,
        patients: dayPatients.length,
      });
    }

    // 2. Monthly statistics (current year vs last year) - Only count patient registrations
    const monthlyStats = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentYear = getYear(now);
    const lastYear = currentYear - 1;

    for (let month = 0; month < 12; month++) {
      // Current year data - patients registered in this month of current year
      const patientsRegisteredCurrentMonth = patientsData.filter((patient) => {
        if (!patient.createdAt || !patient.createdAt.seconds) return false;
        const regDate = new Date(patient.createdAt.seconds * 1000);
        return getMonth(regDate) === month && getYear(regDate) === currentYear;
      });

      // Last year data - patients registered in this month of last year
      const patientsRegisteredLastMonth = patientsData.filter((patient) => {
        if (!patient.createdAt || !patient.createdAt.seconds) return false;
        const regDate = new Date(patient.createdAt.seconds * 1000);
        return getMonth(regDate) === month && getYear(regDate) === lastYear;
      });

      monthlyStats.push({
        name: monthNames[month],
        patients: patientsRegisteredCurrentMonth.length,
        lastYear: patientsRegisteredLastMonth.length,
      });
    }

    // 3. Yearly statistics (last 5 years) - Only count patient registrations
    const yearlyStats = [];

    for (let i = 4; i >= 0; i--) {
      const targetYear = currentYear - i;

      // Count patients registered in this year
      const yearPatients = patientsData.filter((patient) => {
        if (!patient.createdAt || !patient.createdAt.seconds) return false;
        const regDate = new Date(patient.createdAt.seconds * 1000);
        return getYear(regDate) === targetYear;
      });

      yearlyStats.push({
        name: targetYear.toString(),
        patients: yearPatients.length,
      });
    }

    setStatisticsData({
      daily: dailyStats,
      monthly: monthlyStats,
      yearly: yearlyStats,
    });
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const isToday = appointment.date === today;
      return isToday;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt.seconds * 1000);
      const dateB = new Date(b.createdAt.seconds * 1000);
      return dateA - dateB;
    })
    .map((appointment) => {
      const user = users.find((user) => user.id === appointment.userId);
      return {
        ...appointment,
        userName: user ? user.name : "Unknown",
      };
    });

  // Calculate growth rates
  const calculateGrowth = (current, previous) => {
    return previous
      ? (((current - previous) / previous) * 100).toFixed(1)
      : "0";
  };

  const getCurrentMonthIndex = () => {
    return new Date().getMonth();
  };

  const monthlyGrowth =
    statisticsData.monthly.length > 0
      ? calculateGrowth(
          statisticsData.monthly[getCurrentMonthIndex()]?.patients || 0,
          statisticsData.monthly[getCurrentMonthIndex() - 1]?.patients || 0
        )
      : "0";

  const yearlyGrowth =
    statisticsData.yearly.length > 0
      ? calculateGrowth(
          statisticsData.yearly[statisticsData.yearly.length - 1]?.patients ||
            0,
          statisticsData.yearly[statisticsData.yearly.length - 2]?.patients || 0
        )
      : "0";

  // Patient activity metrics
  const calculatePatientActivity = () => {
    const today = new Date();
    const last30Days = subDays(today, 30);

    // Active patients in last 30 days (only users with role "pasien")
    const activePatients = patients.filter((patient) => {
      if (!patient.lastLogin) return false;
      const loginDate =
        typeof patient.lastLogin === "string"
          ? parseISO(patient.lastLogin)
          : new Date(patient.lastLogin.seconds * 1000);
      return isAfter(loginDate, last30Days);
    }).length;

    // Return percentage of active patients
    return patients.length > 0
      ? ((activePatients / patients.length) * 100).toFixed(1)
      : "0";
  };

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <p className="font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const TableSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="h-12 w-full" />
      ))}
    </div>
  );

  return (
    <SidebarLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">
              Welcome!, {session?.user?.name?.split(" ")[0]}
            </h1>
            <p className="text-gray-600 text-medium">
              Stay informed with the latest updates, manage your activities, and
              access all your essential tools in one place. Let's make your
              experience smooth and efficient! 🚀
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <CardDashboard
            title="Total Pasien"
            data={patients.length.toLocaleString()}
            description={`${calculatePatientActivity()}% aktif dalam 30 hari terakhir`}
            icon={Users}
          />

          <CardDashboard
            title="Total Dokter"
            data={doctors.length.toLocaleString()}
            description="Spesialis berbagai bidang medis"
            icon={Stethoscope}
          />

          <CardDashboard
            title="Janji Temu"
            data={appointments.length.toLocaleString()}
            description={`${filteredAppointments.length} janji temu hari ini`}
            icon={Calendar}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Statistik Pasien</CardTitle>
              <CardDescription>
                Pertumbuhan bulanan:{" "}
                <span
                  className={
                    parseFloat(monthlyGrowth) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {parseFloat(monthlyGrowth) >= 0 ? "+" : ""}
                  {monthlyGrowth}%
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="monthly">
                <TabsList className="flex space-x-2 bg-gray-100 p-2 rounded-md mb-4">
                  <TabsTrigger value="daily">Harian</TabsTrigger>
                  <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                  <TabsTrigger value="yearly">Tahunan</TabsTrigger>
                </TabsList>

                <TabsContent value="daily">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={statisticsData.daily}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#3b82f6"
                        name="Aktivitas Pasien"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="monthly">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={statisticsData.monthly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#3b82f6"
                        name="Tahun Ini"
                      />
                      <Line
                        type="monotone"
                        dataKey="lastYear"
                        stroke="#94a3b8"
                        strokeDasharray="5 5"
                        name="Tahun Lalu"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="yearly">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={statisticsData.yearly}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#3b82f6"
                        name="Total Pasien"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pertumbuhan Tahunan</CardTitle>
              <CardDescription>
                Pertumbuhan tahun ini:{" "}
                <span
                  className={
                    parseFloat(yearlyGrowth) >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {parseFloat(yearlyGrowth) >= 0 ? "+" : ""}
                  {yearlyGrowth}%
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statisticsData.yearly} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="patients"
                      fill="#3b82f6"
                      name="Total Pasien"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Janji Temu Section */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <CardLayout
            title="Daftar Data Janji Temu Hari Ini"
            description={`${filteredAppointments.length} janji temu terjadwal untuk ${today}`}
            columns={columns}
            data={filteredAppointments}
            itemsPerPage={10}
          />
        )}
      </div>
    </SidebarLayout>
  );
}
