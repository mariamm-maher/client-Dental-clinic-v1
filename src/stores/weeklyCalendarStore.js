import { create } from "zustand";
import { addDays, addWeeks, subWeeks } from "date-fns";

const useWeeklyCalendarStore = create((set, get) => ({
  // State
  currentWeek: new Date(),
  selectedFilter: "all",

  // Mock data
  appointments: [
    {
      id: 1,
      patientName: "سارة أحمد",
      doctorName: "د. أحمد الراشد",
      treatment: "تنظيف الأسنان",
      time: "09:00",
      duration: 30,
      status: "confirmed",
      date: new Date(),
    },
    {
      id: 2,
      patientName: "أحمد محمد العلي",
      doctorName: "د. سارة أحمد",
      treatment: "علاج العصب",
      time: "09:30",
      duration: 60,
      status: "confirmed",
      date: new Date(),
    },
    {
      id: 3,
      patientName: "فاطمة عبدالله",
      doctorName: "د. أحمد الراشد",
      treatment: "تبييض الأسنان",
      time: "14:00",
      duration: 45,
      status: "pending",
      date: addDays(new Date(), 1),
    },
    {
      id: 4,
      patientName: "محمد الرشيد",
      doctorName: "د. سارة أحمد",
      treatment: "استشارة تقويم الأسنان",
      time: "10:30",
      duration: 30,
      status: "confirmed",
      date: addDays(new Date(), 2),
    },
    {
      id: 5,
      patientName: "ليلى أحمد",
      doctorName: "د. أحمد الراشد",
      treatment: "حشو الأسنان",
      time: "11:00",
      duration: 45,
      status: "confirmed",
      date: addDays(new Date(), 3),
    },
    {
      id: 6,
      patientName: "علياء منصور",
      doctorName: "د. محمد حسن",
      treatment: "خلع ضرس العقل",
      time: "15:00",
      duration: 75,
      status: "cancelled",
      date: addDays(new Date(), 4),
    },
  ],

  doctors: [
    { id: 1, name: "د. أحمد الراشد", color: "bg-sky-500", colorClass: "sky" },
    {
      id: 2,
      name: "د. سارة أحمد",
      color: "bg-emerald-500",
      colorClass: "emerald",
    },
    {
      id: 3,
      name: "د. محمد حسن",
      color: "bg-violet-500",
      colorClass: "violet",
    },
  ],

  // Actions
  setCurrentWeek: (week) => set({ currentWeek: week }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),

  // Navigate weeks
  goToPreviousWeek: () => {
    set((state) => ({
      currentWeek: subWeeks(state.currentWeek, 1),
    }));
  },

  goToNextWeek: () => {
    set((state) => ({
      currentWeek: addWeeks(state.currentWeek, 1),
    }));
  },

  goToCurrentWeek: () => {
    set({ currentWeek: new Date() });
  },

  // Filter appointments
  getAppointmentsForDay: (date) => {
    const { appointments, selectedFilter } = get();
    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const targetDate = new Date(date);

        const sameDay =
          appointmentDate.toDateString() === targetDate.toDateString();
        const matchesFilter =
          selectedFilter === "all" || appointment.doctorName === selectedFilter;

        return sameDay && matchesFilter;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  },

  // Get doctor color
  getDoctorColor: (doctorName) => {
    const { doctors } = get();
    const doctor = doctors.find((d) => d.name === doctorName);
    return doctor?.colorClass || "gray";
  },

  // Get week statistics
  getWeekStatistics: (weekDays) => {
    const { appointments } = get();
    const start = weekDays[0];
    const end = weekDays[6];

    const weekAppointments = appointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      return aptDate >= start && aptDate <= end;
    });

    const todayAppointments = get().getAppointmentsForDay(new Date());

    return {
      weekTotal: weekAppointments.length,
      todayTotal: todayAppointments.length,
      doctorsCount: get().doctors.length,
    };
  },

  // Add new appointment
  addAppointment: (appointmentData) => {
    const { appointments } = get();
    const newAppointment = {
      id: appointments.length + 1,
      ...appointmentData,
      status: "pending",
    };

    set({
      appointments: [...appointments, newAppointment],
    });
  },

  // Update appointment status
  updateAppointmentStatus: (appointmentId, newStatus) => {
    const { appointments } = get();
    set({
      appointments: appointments.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ),
    });
  },
}));

export default useWeeklyCalendarStore;
