import { create } from "zustand";
import {
  addDays,
  addWeeks,
  subWeeks,
  isPast,
  isToday,
  isFuture,
  addMonths,
  subMonths,
  startOfMonth,
  format,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { getCalendarAppointments } from "@/features/staff-dashboard/services/staffServices";

const useCalendarStore = create((set, get) => ({
  // State
  currentWeek: new Date(),
  currentDate: new Date(),
  selectedFilter: "all",
  appointments: [],
  appointmentsByDate: {},
  loading: false,
  error: null,

  // Actions
  setCurrentWeek: (week) => set({ currentWeek: week }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  // Navigate weeks
  goToPreviousWeek: async () => {
    set((state) => ({
      currentWeek: subWeeks(state.currentWeek, 1),
    }));
    await get().fetchAppointments("week");
  },

  goToNextWeek: async () => {
    set((state) => ({ currentWeek: addWeeks(state.currentWeek, 1) }));
    await get().fetchAppointments("week");
  },

  goToCurrentWeek: async () => {
    set({ currentWeek: new Date() });
    await get().fetchAppointments("week");
  },

  // Navigate days
  goToPreviousDay: async () => {
    set((state) => ({
      currentDate: addDays(state.currentDate, -1),
    }));
    await get().fetchAppointments("day");
  },

  goToNextDay: async () => {
    set((state) => ({
      currentDate: addDays(state.currentDate, 1),
    }));
    await get().fetchAppointments("day");
  },

  goToToday: async () => {
    set({ currentDate: new Date() });
    await get().fetchAppointments("day");
  },

  // Month navigation
  goToPreviousMonth: async () => {
    set((state) => ({
      currentWeek: subMonths(startOfMonth(state.currentWeek), 1),
    }));
    await get().fetchAppointments("month");
  },
  goToNextMonth: async () => {
    set((state) => ({
      currentWeek: addMonths(startOfMonth(state.currentWeek), 1),
    }));
    await get().fetchAppointments("month");
  },
  goToCurrentMonth: async () => {
    set({ currentWeek: startOfMonth(new Date()) });
    await get().fetchAppointments("month");
  },
  // Filter appointments
  getAppointmentsForDay: (date) => {
    const { appointmentsByDate, selectedFilter } = get();
    const dateKey = format(new Date(date), "yyyy-MM-dd");
    const dayAppointments = appointmentsByDate[dateKey] || [];

    return dayAppointments
      .filter((appointment) => {
        const matchesFilter =
          selectedFilter === "all" || appointment.doctorName === selectedFilter;
        return matchesFilter;
      })
      .sort(
        (a, b) =>
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
      );
  },

  // Fetch appointments from API
  fetchAppointments: async (viewType = "week") => {
    set({ loading: true, error: null });

    try {
      const { currentWeek, currentDate } = get();
      let startDate, endDate;

      if (viewType === "day") {
        startDate = format(currentDate, "yyyy-MM-dd");
        endDate = format(currentDate, "yyyy-MM-dd");
      } else if (viewType === "week") {
        startDate = format(
          startOfWeek(currentWeek, { weekStartsOn: 6 }),
          "yyyy-MM-dd"
        ); // Saturday start
        endDate = format(
          endOfWeek(currentWeek, { weekStartsOn: 6 }),
          "yyyy-MM-dd"
        );
      } else if (viewType === "month") {
        startDate = format(startOfMonth(currentWeek), "yyyy-MM-dd");
        endDate = format(
          endOfWeek(addMonths(startOfMonth(currentWeek), 1), {
            weekStartsOn: 6,
          }),
          "yyyy-MM-dd"
        );
      }

      const response = await getCalendarAppointments({
        startDate,
        endDate,
        viewType,
      });

      if (response.success) {
        set({
          appointments: response.data.data.appointments || [],
          appointmentsByDate: response.data.data.appointmentsByDate || {},
          loading: false,
          error: null,
        });
      } else {
        set({
          loading: false,
          error: response.message || "فشل في جلب المواعيد",
        });
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      set({
        loading: false,
        error: "فشل في جلب المواعيد",
      });
    }
  },
  // Get appointments with status information
  getAppointmentsWithStatus: (date) => {
    const appointments = get().getAppointmentsForDay(date);
    return appointments.map((appointment) => ({
      ...appointment,
      isPast: isPast(new Date(appointment.appointmentDate)),
      isToday: isToday(new Date(appointment.appointmentDate)),
      isFuture: isFuture(new Date(appointment.appointmentDate)),
    }));
  },

  // Get appointment status styles
  getAppointmentStatusStyles: (appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);
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
      canceled: {
        border: "border-l-red-500",
        bg: "bg-red-50/80",
        text: "text-red-700",
        badge: "bg-red-100 text-red-700",
      },
      done: {
        border: "border-l-blue-500",
        bg: "bg-blue-50/80",
        text: "text-blue-700",
        badge: "bg-blue-100 text-blue-700",
      },
      missed: {
        border: "border-l-gray-500",
        bg: "bg-gray-50/80",
        text: "text-gray-700",
        badge: "bg-gray-100 text-gray-700",
      },
    };

    let styles = statusStyles[appointment.status] || statusStyles.pending;

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

export default useCalendarStore;
