import { create } from "zustand";
import {
  addDays,
  addWeeks,
  subWeeks,
  isSameDay,
  isPast,
  isToday,
  isFuture,
} from "date-fns";

const useWeeklyCalendarStore = create((set, get) => ({
  // State
  currentWeek: new Date(),
  currentDate: new Date(),
  selectedFilter: "all",
  viewType: "week", // 'day', 'week', 'month'
  // Mock data with enhanced status tracking
  appointments: [
    // Past appointments
    {
      id: 1,
      patientName: "سارة أحمد",
      doctorName: "د. أحمد الراشد",
      service: "كشف",
      time: "09:00",
      duration: 30,
      status: "completed",
      date: addDays(new Date(), -3), // 3 days ago
      notes: "تم إجراء الفحص بنجاح",
    },
    {
      id: 2,
      patientName: "أحمد محمد العلي",
      doctorName: "د. سارة أحمد",
      service: "استشارة",
      time: "10:30",
      duration: 60,
      status: "completed",
      date: addDays(new Date(), -2), // 2 days ago
      notes: "استشارة متابعة",
    },
    {
      id: 3,
      patientName: "منى الزهراني",
      doctorName: "د. محمد حسن",
      service: "كشف",
      time: "11:00",
      duration: 45,
      status: "no-show",
      date: addDays(new Date(), -1), // yesterday
      notes: "لم يحضر المريض",
    },

    // Today's appointments
    {
      id: 4,
      patientName: "فاطمة عبدالله",
      doctorName: "د. أحمد الراشد",
      service: "كشف",
      time: "09:00",
      duration: 45,
      status: "confirmed",
      date: new Date(), // today
      notes: "موعد صباحي",
    },
    {
      id: 5,
      patientName: "خالد السعود",
      doctorName: "د. سارة أحمد",
      service: "استشارة",
      time: "11:30",
      duration: 60,
      status: "in-progress",
      date: new Date(), // today
      notes: "جاري الآن",
    },
    {
      id: 6,
      patientName: "نورا أحمد",
      doctorName: "د. محمد حسن",
      service: "كشف",
      time: "14:00",
      duration: 30,
      status: "confirmed",
      date: new Date(), // today
      notes: "موعد بعد الظهر",
    },

    // Future appointments
    {
      id: 7,
      patientName: "محمد الرشيد",
      doctorName: "د. أحمد الراشد",
      service: "استشارة",
      time: "10:30",
      duration: 30,
      status: "confirmed",
      date: addDays(new Date(), 1), // tomorrow
      notes: "موعد متابعة",
    },
    {
      id: 8,
      patientName: "ليلى أحمد",
      doctorName: "د. سارة أحمد",
      service: "كشف",
      time: "09:00",
      duration: 45,
      status: "pending",
      date: addDays(new Date(), 2),
      notes: "في انتظار التأكيد",
    },
    {
      id: 9,
      patientName: "علياء منصور",
      doctorName: "د. محمد حسن",
      service: "استشارة",
      time: "15:00",
      duration: 75,
      status: "confirmed",
      date: addDays(new Date(), 4),
      notes: "استشارة تخصصية",
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
  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  setViewType: (viewType) => set({ viewType }),

  // Navigate weeks
  goToPreviousWeek: () => {
    set((state) => ({
      currentWeek: subWeeks(state.currentWeek, 1),
    }));
  },

  goToNextWeek: () => {
    set((state) => ({ currentWeek: addWeeks(state.currentWeek, 1) }));
  },

  goToCurrentWeek: () => {
    set({ currentWeek: new Date() });
  },

  // Navigate days
  goToPreviousDay: () => {
    set((state) => ({
      currentDate: addDays(state.currentDate, -1),
    }));
  },

  goToNextDay: () => {
    set((state) => ({
      currentDate: addDays(state.currentDate, 1),
    }));
  },

  goToToday: () => {
    set({ currentDate: new Date() });
  },

  // Filter appointments
  getAppointmentsForDay: (date) => {
    const { appointments, selectedFilter } = get();
    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        const targetDate = new Date(date);

        const sameDay = isSameDay(appointmentDate, targetDate);
        const matchesFilter =
          selectedFilter === "all" || appointment.doctorName === selectedFilter;

        return sameDay && matchesFilter;
      })
      .sort((a, b) => a.time.localeCompare(b.time));
  },

  // Get appointments with status information
  getAppointmentsWithStatus: (date) => {
    const appointments = get().getAppointmentsForDay(date);
    return appointments.map((appointment) => ({
      ...appointment,
      isPast: isPast(new Date(appointment.date)),
      isToday: isToday(new Date(appointment.date)),
      isFuture: isFuture(new Date(appointment.date)),
    }));
  },

  // Get appointment status styles
  getAppointmentStatusStyles: (appointment) => {
    const appointmentDate = new Date(appointment.date);
    const isPastDate = isPast(appointmentDate) && !isToday(appointmentDate);
    const isTodayDate = isToday(appointmentDate);

    // Base styles for different statuses
    const statusStyles = {
      confirmed: {
        border: "border-l-emerald-500",
        bg: "bg-emerald-50/80",
        text: "text-emerald-700",
        badge: "bg-emerald-100 text-emerald-700",
      },
      pending: {
        border: "border-l-amber-500",
        bg: "bg-amber-50/80",
        text: "text-amber-700",
        badge: "bg-amber-100 text-amber-700",
      },
      cancelled: {
        border: "border-l-red-500",
        bg: "bg-red-50/80",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
      },
      completed: {
        border: "border-l-blue-500",
        bg: "bg-blue-50/80",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
      },
      "in-progress": {
        border: "border-l-violet-500",
        bg: "bg-violet-50/80",
        text: "text-violet-700",
        badge: "bg-violet-100 text-violet-700",
      },
      "no-show": {
        border: "border-l-gray-500",
        bg: "bg-gray-50/80",
        text: "text-gray-700",
        badge: "bg-gray-100 text-gray-700",
      },
    };

    let styles = statusStyles[appointment.status] || statusStyles.confirmed;

    // Modify styles based on date
    if (isPastDate) {
      styles = {
        ...styles,
        bg: "bg-gray-100/60",
        text: "text-gray-500",
        opacity: "opacity-70",
        disabled: true,
      };
    } else if (isTodayDate) {
      styles = {
        ...styles,
        glow: "ring-2 ring-blue-200 shadow-lg shadow-blue-100/50",
        today: true,
      };
    }

    return styles;
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
