import { create } from "zustand";

const useStatisticsStore = create((set, get) => ({
  // State
  timeRange: "monthly",
  selectedMetrics: "appointments",

  // Enhanced comprehensive statistics data
  stats: {
    // 1. Appointments Statistics
    appointments: {
      overview: [
        {
          title: "إجمالي المواعيد",
          value: "2,847",
          change: "+18.5%",
          trend: "up",
          icon: "Calendar",
          color: "sky",
          description: "جميع الأوقات",
        },
        {
          title: "مواعيد هذا الشهر",
          value: "340",
          change: "+12.3%",
          trend: "up",
          icon: "CalendarDays",
          color: "emerald",
          description: "آخر 30 يوم",
        },
        {
          title: "المواعيد القادمة",
          value: "87",
          change: "+5.2%",
          trend: "up",
          icon: "CalendarPlus",
          color: "violet",
          description: "الأسبوع القادم",
        },
      ],
      status: [
        {
          title: "المواعيد المكتملة",
          value: 256,
          total: 340,
          percentage: 75.3,
          icon: "CheckCircle",
          color: "emerald",
        },
        {
          title: "المواعيد الملغاة",
          value: 42,
          total: 340,
          percentage: 12.4,
          icon: "XCircle",
          color: "red",
        },
        {
          title: "المواعيد الفائتة",
          value: 28,
          total: 340,
          percentage: 8.2,
          icon: "Clock",
          color: "amber",
        },
      ],
    },

    // 2. Patients Statistics
    patients: {
      overview: [
        {
          title: "إجمالي المرضى",
          value: "1,847",
          change: "+15.2%",
          trend: "up",
          icon: "Users",
          color: "sky",
          description: "جميع المرضى",
        },
        {
          title: "مرضى جدد",
          value: "127",
          change: "+22.1%",
          trend: "up",
          icon: "UserPlus",
          color: "emerald",
          description: "هذا الشهر",
        },
      ],
    },

    // 4. Export & Reports Statistics
    exports: {
      overview: [
        {
          title: "التصديرات الشهرية",
          value: "89",
          change: "+15.2%",
          trend: "up",
          icon: "Download",
          color: "sky",
          description: "هذا الشهر",
        },
        {
          title: "آخر تصدير",
          value: "اليوم",
          change: "10:30 ص",
          trend: "neutral",
          icon: "FileText",
          color: "emerald",
          description: "تقرير المواعيد",
        },
      ],
      types: [
        {
          type: "تقارير المواعيد",
          count: 34,
          percentage: 38.2,
          lastExport: "2025-08-31",
          color: "sky",
        },
        {
          type: "قوائم المرضى",
          count: 28,
          percentage: 31.5,
          lastExport: "2025-08-30",
          color: "emerald",
        },
        {
          type: "التقارير المالية",
          count: 18,
          percentage: 20.2,
          lastExport: "2025-08-29",
          color: "violet",
        },
        {
          type: "الإحصائيات",
          count: 9,
          percentage: 10.1,
          lastExport: "2025-08-28",
          color: "amber",
        },
      ],
    },
  },

  // Actions
  setTimeRange: (range) => set({ timeRange: range }),
  setSelectedMetrics: (metrics) => set({ selectedMetrics: metrics }),

  // Get specific statistics section
  getStatsSection: (section) => {
    const { stats } = get();
    return stats[section] || {};
  },

  // Get all statistics
  getAllStats: () => {
    return get().stats;
  },

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
