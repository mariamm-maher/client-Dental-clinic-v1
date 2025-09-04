import { create } from "zustand";
import { toast } from "sonner";
import {
  searchPatientsByNameOrPhone,
  createAppointment,
  getTodaysAppointments,
  updateAppointmentStatus as updateAppointmentStatusAPI,
} from "@/features/staff-dashboard/services/staffServices";

// LocalStorage helpers
const APPOINTMENT_FORM_KEY = "appointment_form_data";

const saveFormDataToStorage = (data) => {
  try {
    localStorage.setItem(APPOINTMENT_FORM_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save form data to localStorage:", error);
  }
};

const loadFormDataFromStorage = () => {
  try {
    const saved = localStorage.getItem(APPOINTMENT_FORM_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("Failed to load form data from localStorage:", error);
    return null;
  }
};

const clearFormDataFromStorage = () => {
  try {
    localStorage.removeItem(APPOINTMENT_FORM_KEY);
  } catch (error) {
    console.error("Failed to clear form data from localStorage:", error);
  }
};

// Load initial form data from localStorage
const initialFormData = loadFormDataFromStorage();

const useAppointmentStore = create((set, get) => ({
  // State
  appointments: [],
  isLoadingAppointments: false,
  appointmentsError: null,
  searchTerm: "",
  filterStatus: "all",
  // Scheduling form state - Initialize with localStorage data if available
  selectedDate: initialFormData?.selectedDate
    ? new Date(initialFormData.selectedDate)
    : null,
  selectedTime: initialFormData?.selectedTime || "",
  selectedPatient: initialFormData?.selectedPatient || "", // This will store the selected patient ID
  selectedPatientData: initialFormData?.selectedPatientData || null, // This will store the full patient object
  selectedService: initialFormData?.selectedService || "",
  service: initialFormData?.service || "",
  notes: initialFormData?.notes || "",
  patientSearch: initialFormData?.patientSearch || "",
  isSubmitting: false,

  // Patient search state
  searchResults: [],
  isSearching: false,
  showSearchResults: false,

  services: ["كشف", "استشارة"],
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
  updateAppointmentStatus: async (appointmentId, newStatus) => {
    const { appointments } = get();
    const appointment = appointments.find((apt) => apt.id === appointmentId);

    if (!appointment) {
      toast.error("الموعد غير موجود");
      return;
    }

    // Optimistic update
    set({
      appointments: appointments.map((apt) => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            status: newStatus,
            checkedInAt:
              newStatus === "confirmed"
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

    try {
      // Call API to update status
      const result = await updateAppointmentStatusAPI(appointmentId, newStatus);

      if (result.success) {
        const statusMessages = {
          confirmed: `تم تأكيد موعد ${appointment?.patientName} بنجاح`,
          pending: `تم تحديث حالة موعد ${appointment?.patientName} إلى قيد الانتظار`,
          canceled: `تم إلغاء موعد ${appointment?.patientName}`,
          done: `تم إنهاء موعد ${appointment?.patientName} بنجاح`,
          missed: `تم وضع علامة فات على موعد ${appointment?.patientName}`,
        };

        toast.success(statusMessages[newStatus] || "تم تحديث الحالة");

        // Refresh appointments to get latest data
        get().fetchTodaysAppointments();
      } else {
        // Revert optimistic update on API failure
        set({
          appointments: appointments.map((apt) => {
            if (apt.id === appointmentId) {
              return appointment; // Restore original state
            }
            return apt;
          }),
        });
        toast.error(result.message || "فشل في تحديث حالة الموعد");
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
      // Revert optimistic update on error
      set({
        appointments: appointments.map((apt) => {
          if (apt.id === appointmentId) {
            return appointment; // Restore original state
          }
          return apt;
        }),
      });
      toast.error("حدث خطأ أثناء تحديث حالة الموعد");
    }
  },

  callPatient: (appointment) => {
    toast.info(
      `جاري الاتصال بـ ${appointment.patientName} على ${appointment.phone}`
    );
  },
  resetFilters: () => set({ searchTerm: "", filterStatus: "all" }),
  // Fetch today's appointments from API
  fetchTodaysAppointments: async () => {
    set({ isLoadingAppointments: true, appointmentsError: null });
    try {
      const result = await getTodaysAppointments();
      if (result.success) {
        // Extract appointments from nested response structure
        const appointmentsData =
          result.data?.data?.appointments ||
          result.data?.appointments ||
          result.data ||
          [];

        // Map API response structure to component expectations
        const mappedAppointments = appointmentsData.map((appointment) => ({
          id: appointment._id,
          patientName: appointment.patientId?.generalInfo?.name || "غير محدد",
          phone: appointment.patientId?.generalInfo?.phone || "غير متوفر",
          service: appointment.service || "كشف",
          appointmentTime: appointment.appointmentDate
            ? new Date(appointment.appointmentDate).toLocaleTimeString("ar", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "غير محدد",
          status: appointment.status || "pending",
          checkedInAt: appointment.checkedInAt
            ? new Date(appointment.checkedInAt).toLocaleTimeString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : null,
          notes: appointment.notes || "",
          // Keep original fields for reference
          originalData: appointment,
        }));

        set({
          appointments: mappedAppointments,
          isLoadingAppointments: false,
        });
      } else {
        set({
          appointments: [],
          appointmentsError: result.message || "فشل في جلب المواعيد",
          isLoadingAppointments: false,
        });
        toast.error(result.message || "فشل في جلب المواعيد");
      }
    } catch (error) {
      console.error("Error fetching today's appointments:", error);
      set({
        appointments: [],
        appointmentsError: error.message || "حدث خطأ أثناء جلب المواعيد",
        isLoadingAppointments: false,
      });
      toast.error("حدث خطأ أثناء جلب المواعيد");
    }
  },

  refreshAppointments: () => {
    // Fetch from API instead of showing mock message
    get().fetchTodaysAppointments();
  },
  // Helper function to save form data to localStorage
  saveFormDataToLocalStorage: () => {
    const state = get();
    const formData = {
      selectedDate: state.selectedDate?.toISOString() || null,
      selectedTime: state.selectedTime,
      selectedPatient: state.selectedPatient,
      selectedPatientData: state.selectedPatientData,
      selectedService: state.selectedService,
      service: state.service,
      notes: state.notes,
      patientSearch: state.patientSearch,
    };
    saveFormDataToStorage(formData);
  },

  // Scheduling form actions
  setSelectedDate: (date) => {
    set({ selectedDate: date });
    get().saveFormDataToLocalStorage();
  },
  setSelectedTime: (time) => {
    set({ selectedTime: time });
    get().saveFormDataToLocalStorage();
  },
  setSelectedPatient: (patient) => {
    set({ selectedPatient: patient });
    get().saveFormDataToLocalStorage();
  },
  setSelectedService: (service) => {
    set({ selectedService: service });
    get().saveFormDataToLocalStorage();
  },
  setService: (service) => {
    set({ service });
    get().saveFormDataToLocalStorage();
  },
  setNotes: (notes) => {
    set({ notes });
    get().saveFormDataToLocalStorage();
  },
  setPatientSearch: (search) => {
    set({ patientSearch: search });
    get().saveFormDataToLocalStorage();
    // Trigger search when user types
    if (search.length >= 2) {
      get().searchPatients(search);
    } else {
      set({ searchResults: [], showSearchResults: false });
    }
  },
  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  // Patient search functionality
  searchPatients: async (query) => {
    if (!query || query.trim().length < 2) {
      set({ searchResults: [], showSearchResults: false });
      return;
    }

    set({ isSearching: true });
    try {
      const result = await searchPatientsByNameOrPhone(query);
      if (result.success && result.data && result.data.length > 0) {
        set({
          searchResults: result.data,
          showSearchResults: true,
          isSearching: false,
        });
      } else {
        set({
          searchResults: [],
          showSearchResults: false,
          isSearching: false,
        });
      }
    } catch (error) {
      console.error("Patient search failed:", error);
      set({
        searchResults: [],
        showSearchResults: false,
        isSearching: false,
      });
    }
  },
  selectPatient: (patient) => {
    set({
      selectedPatient: patient._id,
      selectedPatientData: patient,
      patientSearch: patient.generalInfo?.name || patient.name || "",
      showSearchResults: false,
      searchResults: [],
    });
    get().saveFormDataToLocalStorage();
  },

  // Get filtered patients based on search
  getFilteredPatients: () => {
    const { patients, patientSearch } = get();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        patient.phone.includes(patientSearch)
    );
  }, // Helper function to convert Arabic time to 24-hour format and combine with date
  combineDateTime: (date, timeString) => {
    if (!date || !timeString) return null;

    // Parse Arabic time format (e.g., "09:30 ص" or "02:30 م")
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    let hour24 = hours;
    if (period === "م" && hours !== 12) {
      hour24 = hours + 12;
    } else if (period === "ص" && hours === 12) {
      hour24 = 0;
    }

    // Create new date object with the selected date and time
    const combinedDateTime = new Date(date);
    combinedDateTime.setHours(hour24, minutes, 0, 0);

    return combinedDateTime;
  },

  // Submit appointment
  submitAppointment: async () => {
    const {
      selectedDate,
      selectedTime,
      selectedPatient,
      selectedService,
      service,
      notes,
      combineDateTime,
    } = get();

    console.log("Submitting appointment with data:", {
      selectedDate,
      selectedTime,
      selectedPatient,
      selectedService,
      service,
      notes,
    });

    if (!selectedDate || !selectedTime || !selectedPatient) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return false;
    }

    set({ isSubmitting: true });

    try {
      // Combine date and time properly
      const appointmentDateTime = combineDateTime(selectedDate, selectedTime);

      if (!appointmentDateTime) {
        toast.error("خطأ في تحديد وقت الموعد");
        set({ isSubmitting: false });
        return false;
      }

      // Create appointment data in the required format with proper ISO date
      const appointmentData = {
        patientId: selectedPatient,
        appointmentDate: appointmentDateTime.toISOString(),
        service: service,
        notes: notes || "",
      };

      console.log(
        "Submitting appointment with combined datetime:",
        appointmentData
      );

      const result = await createAppointment(appointmentData);

      if (result.success) {
        toast.success(result.message || "تم حجز الموعد بنجاح");

        // Reset form
        get().resetSchedulingForm();
        return true;
      } else {
        toast.error(result.message || "فشل في حجز الموعد");
        return false;
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error(
        error?.message || "حدث خطأ أثناء حجز الموعد. يرجى المحاولة مرة أخرى"
      );
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  }, // Reset scheduling form
  resetSchedulingForm: () => {
    set({
      selectedDate: null,
      selectedTime: "",
      selectedPatient: "",
      selectedPatientData: null,
      selectedService: "",
      service: "",
      notes: "",
      patientSearch: "",
      searchResults: [],
      showSearchResults: false,
      isSearching: false,
    });
    // Clear localStorage when form is reset
    clearFormDataFromStorage();
  },

  // Cancel appointment form (same as reset but with different messaging)
  cancelAppointmentForm: () => {
    get().resetSchedulingForm();
    toast.info("تم إلغاء النموذج وحفظ البيانات");
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
