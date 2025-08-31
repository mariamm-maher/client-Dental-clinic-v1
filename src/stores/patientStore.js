import { create } from "zustand";
import { toast } from "sonner";
import {
  createPatient,
  getLatestPatients,
} from "@/features/staff-dashboard/services/staffServices";

const usePatientStore = create((set, get) => ({
  // State
  formData: {
    generalInfo: {
      name: "",
      phone: "",
    },
  },
  isSubmitting: false,
  recentPatients: [],
  isLoadingRecent: false,
  recentPatientsError: null,
  // Actions
  setFormData: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        generalInfo: {
          ...state.formData.generalInfo,
          [field]: value,
        },
      },
    }));
  },

  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),
  // Fetch recent patients from API
  fetchRecentPatients: async () => {
    set({ isLoadingRecent: true, recentPatientsError: null });

    try {
      const result = await getLatestPatients();
      console.log(result, "result from get latest patients");
      console.log(result.data, "data from get latest patients");

      if (result.success) {
        // Handle the API response data structure
        const patientsArr = Array.isArray(result.data?.data?.patients)
          ? result.data?.data?.patients
          : [];

        // Transform API data to match component expectations
        const transformedPatients = patientsArr.map((patient) => ({
          id: patient._id,
          name: patient.generalInfo?.name || "Unknown",
          phone: patient.generalInfo?.phone || "N/A",
          registeredAt: new Date(patient.createdAt).toLocaleTimeString("ar", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          createdAt: patient.createdAt,
        }));

        set({
          recentPatients: transformedPatients,
          isLoadingRecent: false,
          recentPatientsError: null,
        });
      } else {
        // Handle case where no data or unsuccessful response
        set({
          recentPatients: [],
          isLoadingRecent: false,
          recentPatientsError: null,
        });
      }
    } catch (error) {
      console.error("Error fetching recent patients:", error);
      set({
        recentPatients: [],
        isLoadingRecent: false,
        recentPatientsError: error.message || "فشل في جلب أحدث المرضى",
      });
      toast.error(error.message || "فشل في جلب أحدث المرضى");
    }
  },
  resetForm: () => {
    set({
      formData: {
        generalInfo: {
          name: "",
          phone: "",
        },
      },
    });
  },
  submitPatient: async () => {
    const { formData } = get();
    if (
      !formData.generalInfo.name.trim() ||
      !formData.generalInfo.phone.trim()
    ) {
      toast.error("يرجى تعبئة الاسم ورقم الهاتف");
      return false;
    }

    if (formData.generalInfo.phone.length < 10) {
      toast.error("يرجى إدخال رقم هاتف صالح");
      return false;
    }
    set({ isSubmitting: true });

    try {
      // Call the real API to create patient with the correct structure
      const result = await createPatient({
        generalInfo: {
          name: formData.generalInfo.name,
          phone: formData.generalInfo.phone,
        },
      });
      console.log(result, "result from the patient creation");
      if (result.success) {
        get().resetForm();
        toast.success(
          result.message ||
            `تم تسجيل المريض ${formData.generalInfo.name} بنجاح!`
        );

        // Refresh recent patients list
        get().fetchRecentPatients();

        return true;
      } else {
        toast.error(result.message || "فشل في تسجيل المريض");
        return false;
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      toast.error(error?.message || "فشل في تسجيل المريض. حاول مرة أخرى.");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
}));

export default usePatientStore;
