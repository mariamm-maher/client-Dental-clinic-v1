import { create } from "zustand";
import { toast } from "sonner";
import { format } from "date-fns";

const useAppointmentStore = create((set, get) => ({
  // State
  appointments: [
    {
      id: 1,
      patientName: "سارة أحمد",
      phone: "+966501234567",
      appointmentTime: "09:00 ص",
      status: "pending",
      treatment: "تنظيف الأسنان",
      doctor: "د. أحمد الراشد",
      notes: "فحص روتيني",
      checkedInAt: null,
    },
    {
      id: 2,
      patientName: "أحمد محمد العلي",
      phone: "+966509876543",
      appointmentTime: "09:30 ص",
      status: "checked-in",
      treatment: "علاج العصب",
      doctor: "د. سارة وليامز",
      notes: "موعد متابعة",
      checkedInAt: "09:25 ص",
    },
    {
      id: 3,
      patientName: "فاطمة عبدالله",
      phone: "+966507654321",
      appointmentTime: "10:00 ص",
      status: "pending",
      treatment: "تقويم الأسنان",
      doctor: "د. أحمد الراشد",
      notes: "استشارة تقويم",
      checkedInAt: null,
    },
    {
      id: 4,
      patientName: "محمد الرشيد",
      phone: "+966556789012",
      appointmentTime: "10:30 ص",
      status: "missed",
      treatment: "حشو الأسنان",
      doctor: "د. محمد حسان",
      notes: "علاج تسوس",
      checkedInAt: null,
    },
    {
      id: 5,
      patientName: "عائشة سالم",
      phone: "+966551234567",
      appointmentTime: "11:00 ص",
      status: "checked-in",
      treatment: "تبييض الأسنان",
      doctor: "د. سارة وليامز",
      notes: "جلسة تبييض",
      checkedInAt: "10:55 ص",
    },
    {
      id: 6,
      patientName: "علي السعد",
      phone: "+966557890123",
      appointmentTime: "11:30 ص",
      status: "pending",
      treatment: "استشارة تقويم",
      doctor: "د. سارة وليامز",
      notes: "استشارة أولى",
      checkedInAt: null,
    },
  ],
  searchTerm: "",
  filterStatus: "all",

  // Scheduling form state
  selectedDate: null,
  selectedTime: "",
  selectedPatient: "",
  selectedDoctor: "",
  treatment: "",
  notes: "",
  patientSearch: "",
  isSubmitting: false,

  // Mock data
  patients: [
    {
      id: 1,
      name: "سارة جونسون",
      phone: "+966501234567",
      lastVisit: "2024-01-15",
    },
    {
      id: 2,
      name: "أحمد محمد العلي",
      phone: "+966509876543",
      lastVisit: "2024-01-20",
    },
    {
      id: 3,
      name: "إيما ديفيز",
      phone: "+966555123456",
      lastVisit: "2024-01-10",
    },
    {
      id: 4,
      name: "محمد الرشيد",
      phone: "+966556789012",
      lastVisit: "2024-01-18",
    },
    {
      id: 5,
      name: "ليزا أندرسون",
      phone: "+966551234567",
      lastVisit: "2024-01-22",
    },
  ],
  doctors: [
    {
      id: 1,
      name: "د. أحمد الراشد",
      specialization: "طب الأسنان العام",
      available: true,
    },
    {
      id: 2,
      name: "د. سارة ويليامز",
      specialization: "تقويم الأسنان",
      available: true,
    },
    {
      id: 3,
      name: "د. محمد حسان",
      specialization: "جراحة الفم",
      available: false,
    },
  ],
  treatments: [
    "تنظيف الأسنان",
    "علاج العصب",
    "تبييض الأسنان",
    "زراعة الأسنان",
    "حشو الأسنان",
    "استشارة تقويم",
    "خلع ضرس العقل",
    "تركيب تاج",
    "علاج اللثة",
    "أشعة الأسنان",
  ],
  timeSlots: [
    "09:00 ص",
    "09:30 ص",
    "10:00 ص",
    "10:30 ص",
    "11:00 ص",
    "11:30 ص",
    "02:00 م",
    "02:30 م",
    "03:00 م",
    "03:30 م",
    "04:00 م",
    "04:30 م",
    "05:00 م",
    "05:30 م",
  ],

  // Actions
  setSearchTerm: (term) => set({ searchTerm: term }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  updateAppointmentStatus: (appointmentId, newStatus) => {
    const { appointments } = get();
    const appointment = appointments.find((apt) => apt.id === appointmentId);

    set({
      appointments: appointments.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            status: newStatus,
            checkedInAt:
              newStatus === "checked-in"
                ? new Date().toLocaleTimeString("ar-SA", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                : null,
          };
        }
        return apt;
      }),
    });

    const statusMessages = {
      "checked-in": `تم تسجيل وصول ${appointment?.patientName} بنجاح`,
      missed: `تم وضع علامة فات على موعد ${appointment?.patientName}`,
      completed: `تم إنهاء موعد ${appointment?.patientName} بنجاح`,
    };

    toast.success(statusMessages[newStatus] || "تم تحديث الحالة");
  },

  callPatient: (appointment) => {
    toast.info(
      `جاري الاتصال بـ ${appointment.patientName} على ${appointment.phone}`
    );
  },

  resetFilters: () => set({ searchTerm: "", filterStatus: "all" }),
  refreshAppointments: () => {
    // In a real app, this would fetch from an API
    toast.success("تم تحديث المواعيد");
  },

  // Scheduling form actions
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setSelectedDoctor: (doctor) => set({ selectedDoctor: doctor }),
  setTreatment: (treatment) => set({ treatment }),
  setNotes: (notes) => set({ notes }),
  setPatientSearch: (search) => set({ patientSearch: search }),
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  // Get filtered patients based on search
  getFilteredPatients: () => {
    const { patients, patientSearch } = get();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.phone.includes(patientSearch)
    );
  },

  // Submit appointment
  submitAppointment: async () => {
    const {
      selectedDate,
      selectedTime,
      selectedPatient,
      selectedDoctor,
      treatment,
      patients,
      doctors,
      appointments,
    } = get();

    if (
      !selectedDate ||
      !selectedTime ||
      !selectedPatient ||
      !selectedDoctor ||
      !treatment
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return false;
    }

    set({ isSubmitting: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const patient = patients.find((p) => p.id.toString() === selectedPatient);
      const doctor = doctors.find((d) => d.id.toString() === selectedDoctor);

      // Create new appointment
      const newAppointment = {
        id: appointments.length + 1,
        patientName: patient?.name,
        phone: patient?.phone,
        appointmentTime: selectedTime,
        status: "pending",
        treatment,
        doctor: doctor?.name,
        notes: get().notes,
        checkedInAt: null,
        date: selectedDate,
      };

      // Add to appointments
      set({
        appointments: [...appointments, newAppointment],
      });

      toast.success(
        `تم حجز الموعد بنجاح للمريض ${patient?.name} مع ${
          doctor?.name
        } في ${format(selectedDate, "PPP")} الساعة ${selectedTime}`
      );

      // Reset form
      get().resetSchedulingForm();
      return true;
    } catch {
      toast.error("حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Reset scheduling form
  resetSchedulingForm: () => {
    set({
      selectedDate: null,
      selectedTime: "",
      selectedPatient: "",
      selectedDoctor: "",
      treatment: "",
      notes: "",
      patientSearch: "",
    });
  },

  // Get today's appointments for preview
  getTodaysAppointments: () => {
    const { appointments } = get();
    const today = new Date();
    return appointments.filter((apt) => {
      if (apt.date) {
        const aptDate = new Date(apt.date);
        return (
          aptDate.getDate() === today.getDate() &&
          aptDate.getMonth() === today.getMonth() &&
          aptDate.getFullYear() === today.getFullYear()
        );
      }
      return true; // Include appointments without date (legacy data)
    });
  },
}));

export default useAppointmentStore;
