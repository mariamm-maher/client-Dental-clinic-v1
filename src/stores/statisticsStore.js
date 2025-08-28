import { create } from "zustand";

const useStatisticsStore = create((set, get) => ({
  // State
  timeRange: "weekly",

  // Mock data for statistics
  stats: {
    overview: [
      {
        title: "إجمالي المرضى",
        value: "1,247",
        change: "+12.5%",
        trend: "up",
        icon: "Users",
        color: "sky",
        description: "هذا الشهر",
      },
      {
        title: "المواعيد اليوم",
        value: "28",
        change: "+5.2%",
        trend: "up",
        icon: "Calendar",
        color: "emerald",
        description: "من 32 موعد مجدول",
      },
      {
        title: "الإيرادات",
        value: "125,400 ر.س",
        change: "+8.1%",
        trend: "up",
        icon: "DollarSign",
        color: "violet",
        description: "هذا الشهر",
      },
      {
        title: "معدل الرضا",
        value: "4.8/5",
        change: "+0.3",
        trend: "up",
        icon: "Star",
        color: "amber",
        description: "تقييم المرضى",
      },
    ],
    appointments: [
      {
        title: "المواعيد المكتملة",
        value: "156",
        total: "180",
        percentage: 87,
        icon: "CheckCircle",
        color: "emerald",
      },
      {
        title: "المواعيد الملغاة",
        value: "8",
        total: "180",
        percentage: 4,
        icon: "XCircle",
        color: "red",
      },
      {
        title: "في الانتظار",
        value: "16",
        total: "180",
        percentage: 9,
        icon: "Timer",
        color: "amber",
      },
    ],
    doctors: [
      {
        name: "د. أحمد محمد",
        specialty: "طب الأسنان العام",
        appointments: 45,
        rating: 4.9,
        revenue: "32,500 ر.س",
        color: "sky",
      },
      {
        name: "د. فاطمة علي",
        specialty: "تقويم الأسنان",
        appointments: 38,
        rating: 4.8,
        revenue: "28,900 ر.س",
        color: "emerald",
      },
      {
        name: "د. محمد سالم",
        specialty: "جراحة الفم",
        appointments: 32,
        rating: 4.7,
        revenue: "25,800 ر.س",
        color: "violet",
      },
    ],
    services: [
      {
        name: "تنظيف الأسنان",
        count: 89,
        revenue: "26,700 ر.س",
        percentage: 35,
        color: "sky",
      },
      {
        name: "حشو الأسنان",
        count: 67,
        revenue: "33,500 ر.س",
        percentage: 27,
        color: "emerald",
      },
      {
        name: "تقويم الأسنان",
        count: 45,
        revenue: "45,000 ر.س",
        percentage: 18,
        color: "violet",
      },
      {
        name: "قلع الأسنان",
        count: 32,
        revenue: "12,800 ر.س",
        percentage: 13,
        color: "amber",
      },
      {
        name: "أخرى",
        count: 18,
        revenue: "7,400 ر.س",
        percentage: 7,
        color: "gray",
      },
    ],
  },

  // Actions
  setTimeRange: (range) => set({ timeRange: range }),

  // Utility functions
  getColorClasses: (color, type = "bg") => {
    const colors = {
      sky: {
        bg: "bg-sky-100",
        text: "text-sky-700",
        border: "border-sky-200",
        icon: "text-sky-600",
        progress: "bg-sky-500",
      },
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        progress: "bg-emerald-500",
      },
      violet: {
        bg: "bg-violet-100",
        text: "text-violet-700",
        border: "border-violet-200",
        icon: "text-violet-600",
        progress: "bg-violet-500",
      },
      amber: {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: "text-amber-600",
        progress: "bg-amber-500",
      },
      red: {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
        icon: "text-red-600",
        progress: "bg-red-500",
      },
      gray: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: "text-gray-600",
        progress: "bg-gray-500",
      },
    };
    return colors[color]?.[type] || colors.sky[type];
  },
  // Get filtered stats based on time range
  getFilteredStats: () => {
    const { stats } = get();
    // In a real application, this would filter data based on timeRange
    // For now, return the mock data as is
    return stats;
  },

  // Export report functionality
  exportReport: (format = "pdf") => {
    // Mock export functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Exporting ${format} report for ${get().timeRange} period`);
        resolve(`report_${Date.now()}.${format}`);
      }, 1000);
    });
  },

  // Quick actions
  reviewPendingAppointments: () => {
    // Mock functionality to review pending appointments
    console.log("Reviewing pending appointments...");
  },

  viewAlerts: () => {
    // Mock functionality to view alerts
    console.log("Viewing system alerts...");
  },
}));

export default useStatisticsStore;
