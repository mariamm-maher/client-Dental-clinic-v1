import { create } from "zustand";
import { toast } from "sonner";

const usePatientStore = create((set, get) => ({
  // State
  formData: {
    name: "",
    phone: "",
  },
  isSubmitting: false,
  recentPatients: [
    {
      id: 1,
      name: "أحمد محمد",
      phone: "+966501234567",
      registeredAt: "10:30 ص",
    },
    {
      id: 2,
      name: "سارة الراشد",
      phone: "+966509876543",
      registeredAt: "11:45 ص",
    },
    {
      id: 3,
      name: "محمد العلي",
      phone: "+966555123456",
      registeredAt: "02:15 م",
    },
  ],

  // Stats data
  stats: [
    {
      label: "تسجيلات اليوم",
      value: "8",
      change: "+3",
      trend: "up",
      color: "sky",
      description: "مريض جديد",
    },
    {
      label: "هذا الأسبوع",
      value: "47",
      change: "+12",
      trend: "up",
      color: "emerald",
      description: "مقارنة بالأسبوع الماضي",
    },
    {
      label: "متوسط الوقت",
      value: "< 2 د",
      change: "-30 ث",
      trend: "up",
      color: "violet",
      description: "لكل تسجيل",
    },
  ],

  // Actions
  setFormData: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  setIsSubmitting: (submitting) => set({ isSubmitting: submitting }),

  resetForm: () => {
    set({
      formData: {
        name: "",
        phone: "",
      },
    });
  },

  submitPatient: async () => {
    const { formData, recentPatients } = get();

    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("يرجى تعبئة الاسم ورقم الهاتف");
      return false;
    }

    if (formData.phone.length < 10) {
      toast.error("يرجى إدخال رقم هاتف صالح");
      return false;
    }

    set({ isSubmitting: true });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newPatient = {
        id: Date.now(),
        name: formData.name,
        phone: formData.phone,
        registeredAt: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Update recent patients and stats
      set((state) => ({
        recentPatients: [newPatient, ...state.recentPatients.slice(0, 4)],
        stats: state.stats.map((stat, index) => {
          if (index === 0) {
            // Today's registrations
            return {
              ...stat,
              value: (parseInt(stat.value) + 1).toString(),
              change: `+${parseInt(stat.change.replace("+", "")) + 1}`,
            };
          }
          return stat;
        }),
      }));

      get().resetForm();
      toast.success(`تم تسجيل المريض ${formData.name} بنجاح!`);
      return true;
    } catch {
      toast.error("فشل في تسجيل المريض. حاول مرة أخرى.");
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // Helper method for color classes
  getColorClasses: (color, type = "bg") => {
    const colors = {
      sky: {
        bg: "bg-sky-100",
        text: "text-sky-700",
        border: "border-sky-200",
        icon: "text-sky-600",
        gradient: "from-sky-500 to-blue-600",
      },
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-600",
        gradient: "from-emerald-500 to-green-600",
      },
      violet: {
        bg: "bg-violet-100",
        text: "text-violet-700",
        border: "border-violet-200",
        icon: "text-violet-600",
        gradient: "from-violet-500 to-purple-600",
      },
    };
    return colors[color]?.[type] || colors.sky[type];
  },
}));

export default usePatientStore;
