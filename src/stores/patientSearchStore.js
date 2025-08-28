import { create } from "zustand";

const usePatientSearchStore = create((set, get) => ({
  // State
  searchTerm: "",
  searchType: "all",
  selectedPatient: null,

  // Mock data
  patients: [
    {
      id: 1,
      name: "سارة أحمد",
      phone: "+966501234567",
      email: "sarah.ahmed@email.com",
      address: "شارع الملك فهد، الرياض",
      dateOfBirth: "1985-03-15",
      lastVisit: "2024-01-20",
      totalVisits: 12,
      status: "active",
      notes: "مريضة منتظمة، تفضل المواعيد الصباحية",
      treatments: ["تنظيف الأسنان", "علاج العصب", "تبييض الأسنان"],
      upcomingAppointments: [
        {
          date: "2025-01-30",
          time: "10:00 ص",
          treatment: "متابعة",
          doctor: "د. أحمد الراشد",
        },
      ],
    },
    {
      id: 2,
      name: "أحمد محمد العلي",
      phone: "+966509876543",
      email: "ahmed.ali@email.com",
      address: "شارع الأمير، جدة",
      dateOfBirth: "1978-07-22",
      lastVisit: "2024-01-18",
      totalVisits: 8,
      status: "active",
      notes: "يعاني من حساسية من اللاتكس، يفضل التعامل مع الطاقم العربي",
      treatments: ["علاج تقويم الأسنان", "حشو الأسنان"],
      upcomingAppointments: [],
    },
    {
      id: 3,
      name: "فاطمة عبدالله",
      phone: "+966555123456",
      email: "fatma.abdullah@email.com",
      address: "شارع التجاري، الدمام",
      dateOfBirth: "1992-11-08",
      lastVisit: "2024-01-10",
      totalVisits: 5,
      status: "active",
      notes: "مريضة جديدة، تشعر بالقلق من إجراءات الأسنان",
      treatments: ["تنظيف الأسنان", "تبييض الأسنان"],
      upcomingAppointments: [
        {
          date: "2025-02-05",
          time: "2:30 م",
          treatment: "فحص",
          doctor: "د. سارة",
        },
      ],
    },
    {
      id: 4,
      name: "محمد الرشيد",
      phone: "+966556789012",
      email: "mohammed.rashid@email.com",
      address: "الحي التجاري، الرياض",
      dateOfBirth: "1970-04-14",
      lastVisit: "2023-12-15",
      totalVisits: 15,
      status: "inactive",
      notes: "مريض مميز، يملك عدة أعمال تجارية",
      treatments: ["زراعة الأسنان", "تركيب التيجان", "علاج اللثة"],
      upcomingAppointments: [],
    },
    {
      id: 5,
      name: "ليلى أحمد",
      phone: "+966551234567",
      email: "layla.ahmed@email.com",
      address: "المنطقة السكنية، الخبر",
      dateOfBirth: "1988-09-30",
      lastVisit: "2024-01-25",
      totalVisits: 7,
      status: "active",
      notes: "تفضل المواعيد المسائية، مغطاة بالتأمين",
      treatments: ["فحص دوري", "حشو الأسنان"],
      upcomingAppointments: [
        {
          date: "2025-01-28",
          time: "3:00 م",
          treatment: "تنظيف",
          doctor: "د. أحمد",
        },
      ],
    },
  ],

  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchType: (type) => set({ searchType: type }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),

  // Get filtered patients
  getFilteredPatients: () => {
    const { patients, searchTerm, searchType } = get();

    if (!searchTerm) return [];

    const searchLower = searchTerm.toLowerCase();

    return patients.filter((patient) => {
      switch (searchType) {
        case "name":
          return patient.name.toLowerCase().includes(searchLower);
        case "phone":
          return patient.phone.includes(searchTerm);
        case "email":
          return patient.email.toLowerCase().includes(searchLower);
        default:
          return (
            patient.name.toLowerCase().includes(searchLower) ||
            patient.phone.includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchLower)
          );
      }
    });
  },

  // Get statistics
  getStatistics: () => {
    const { patients } = get();

    const activePatients = patients.filter((p) => p.status === "active");
    const recentVisits = patients.filter(
      (p) =>
        new Date(p.lastVisit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    return {
      total: patients.length,
      active: activePatients.length,
      recent: recentVisits.length,
    };
  },

  // Utility functions
  getStatusBadge: (status) => {
    const statusConfig = {
      active: {
        label: "نشط",
        className: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      inactive: {
        label: "غير نشط",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      },
      blocked: {
        label: "محظور",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return (
      statusConfig[status] || {
        label: "غير معروف",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      }
    );
  },

  calculateAge: (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  },

  getColorClasses: (color, type = "bg") => {
    const colors = {
      sky: {
        bg: "bg-sky-100",
        text: "text-sky-700",
        border: "border-sky-200",
        icon: "text-sky-600",
      },
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-600",
      },
      violet: {
        bg: "bg-violet-100",
        text: "text-violet-700",
        border: "border-violet-200",
        icon: "text-violet-600",
      },
    };
    return colors[color]?.[type] || colors.sky[type];
  },
}));

export default usePatientSearchStore;
