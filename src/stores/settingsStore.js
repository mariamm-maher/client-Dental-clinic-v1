import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getClinicSettings,
  updateClinicSettings,
  deleteClinicSettings,
} from "@/features/staff-dashboard/services/staffServices";

const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Schedule Settings
      schedule: {
        sunday: { enabled: false, shifts: [] },
        monday: { enabled: false, shifts: [] },
        tuesday: { enabled: false, shifts: [] },
        wednesday: { enabled: false, shifts: [] },
        thursday: { enabled: false, shifts: [] },
        friday: { enabled: false, shifts: [] },
        saturday: { enabled: false, shifts: [] },
      },
      scheduleHasChanges: false,

      // Profile Settings
      profile: {
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          role: "",
          department: "",
          employeeId: "",
        },
        accountSettings: {
          language: "ar",
          timezone: "Asia/Riyadh",
          dateFormat: "DD/MM/YYYY",
          timeFormat: "12h",
        },
        securitySettings: {
          twoFactorEnabled: false,
          passwordLastChanged: null,
          loginNotifications: true,
        },
      },
      profileHasChanges: false,

      // Notification Settings
      notifications: {
        appointments: {
          newAppointment: true,
          appointmentReminder: true,
          appointmentCancellation: true,
          appointmentRescheduling: true,
        },
        patients: {
          newPatientRegistration: true,
          patientCheckIn: true,
          patientNoShow: true,
        },
        system: {
          systemMaintenance: true,
          systemUpdates: false,
          backupStatus: true,
          securityAlerts: true,
        },
        delivery: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          inAppNotifications: true,
        },
        schedule: {
          quietHoursEnabled: false,
          quietHoursStart: "22:00",
          quietHoursEnd: "08:00",
        },
      },
      notificationsHasChanges: false,

      // Theme Settings
      theme: {
        appearance: {
          mode: "light", // light, dark, system
          primaryColor: "blue",
          fontSize: "medium", // small, medium, large
          compactMode: false,
        },
        layout: {
          sidebarCollapsed: false,
          showQuickActions: true,
          showNotificationBadges: true,
        },
        accessibility: {
          highContrast: false,
          reducedMotion: false,
          screenReaderOptimized: false,
        },
      },
      themeHasChanges: false,

      // System Settings
      system: {
        clinic: {
          name: "",
          address: "",
          phone: "",
          email: "",
          website: "",
          logo: null,
        },
        business: {
          currency: "SAR",
          taxRate: 15,
          appointmentDuration: 30,
          maxAdvanceBookingDays: 90,
          cancellationPolicy: "",
        },
        technical: {
          autoBackup: true,
          backupFrequency: "daily",
          dataRetentionPeriod: 365,
          maintenanceMode: false,
        },
        integrations: {
          smsProvider: "local",
          emailProvider: "local",
          paymentGateway: "none",
          calendarSync: false,
        },
      },
      systemHasChanges: false,

      // Loading states
      isLoading: false,
      error: null,

      // API Settings state
      apiSettings: null,
      hasWeeklySchedule: false,
      needsInitialization: false,

      // Schedule Actions
      setSchedule: (schedule) => {
        set({ schedule, scheduleHasChanges: true });
      },

      toggleDay: (dayKey) => {
        const currentSchedule = get().schedule;
        const daySchedule = currentSchedule[dayKey];

        set({
          schedule: {
            ...currentSchedule,
            [dayKey]: {
              ...daySchedule,
              enabled: !daySchedule.enabled,
              shifts: !daySchedule.enabled
                ? [{ startTime: "09:00", endTime: "17:00" }]
                : [],
            },
          },
          scheduleHasChanges: true,
        });
      },

      addShift: (dayKey) => {
        const currentSchedule = get().schedule;
        set({
          schedule: {
            ...currentSchedule,
            [dayKey]: {
              ...currentSchedule[dayKey],
              shifts: [
                ...currentSchedule[dayKey].shifts,
                { startTime: "09:00", endTime: "17:00" },
              ],
            },
          },
          scheduleHasChanges: true,
        });
      },

      removeShift: (dayKey, shiftIndex) => {
        const currentSchedule = get().schedule;
        set({
          schedule: {
            ...currentSchedule,
            [dayKey]: {
              ...currentSchedule[dayKey],
              shifts: currentSchedule[dayKey].shifts.filter(
                (_, index) => index !== shiftIndex
              ),
            },
          },
          scheduleHasChanges: true,
        });
      },

      updateShiftTime: (dayKey, shiftIndex, timeType, value) => {
        const currentSchedule = get().schedule;
        set({
          schedule: {
            ...currentSchedule,
            [dayKey]: {
              ...currentSchedule[dayKey],
              shifts: currentSchedule[dayKey].shifts.map((shift, index) =>
                index === shiftIndex ? { ...shift, [timeType]: value } : shift
              ),
            },
          },
          scheduleHasChanges: true,
        });
      },

      setDefaultSchedule: () => {
        const defaultSchedule = {
          sunday: {
            enabled: true,
            shifts: [{ startTime: "09:00", endTime: "17:00" }],
          },
          monday: {
            enabled: true,
            shifts: [{ startTime: "09:00", endTime: "17:00" }],
          },
          tuesday: {
            enabled: true,
            shifts: [{ startTime: "09:00", endTime: "17:00" }],
          },
          wednesday: {
            enabled: true,
            shifts: [{ startTime: "09:00", endTime: "17:00" }],
          },
          thursday: {
            enabled: true,
            shifts: [{ startTime: "09:00", endTime: "17:00" }],
          },
          friday: { enabled: false, shifts: [] },
          saturday: { enabled: false, shifts: [] },
        };
        set({ schedule: defaultSchedule, scheduleHasChanges: true });
      },

      resetSchedule: () => {
        const emptySchedule = {
          sunday: { enabled: false, shifts: [] },
          monday: { enabled: false, shifts: [] },
          tuesday: { enabled: false, shifts: [] },
          wednesday: { enabled: false, shifts: [] },
          thursday: { enabled: false, shifts: [] },
          friday: { enabled: false, shifts: [] },
          saturday: { enabled: false, shifts: [] },
        };
        set({ schedule: emptySchedule, scheduleHasChanges: true });
      },

      // Profile Actions
      updateProfilePersonalInfo: (info) => {
        const currentProfile = get().profile;
        set({
          profile: {
            ...currentProfile,
            personalInfo: { ...currentProfile.personalInfo, ...info },
          },
          profileHasChanges: true,
        });
      },

      updateProfileAccountSettings: (settings) => {
        const currentProfile = get().profile;
        set({
          profile: {
            ...currentProfile,
            accountSettings: { ...currentProfile.accountSettings, ...settings },
          },
          profileHasChanges: true,
        });
      },

      updateProfileSecuritySettings: (settings) => {
        const currentProfile = get().profile;
        set({
          profile: {
            ...currentProfile,
            securitySettings: {
              ...currentProfile.securitySettings,
              ...settings,
            },
          },
          profileHasChanges: true,
        });
      },

      // Notification Actions
      updateNotificationCategory: (category, settings) => {
        const currentNotifications = get().notifications;
        set({
          notifications: {
            ...currentNotifications,
            [category]: { ...currentNotifications[category], ...settings },
          },
          notificationsHasChanges: true,
        });
      },

      // Theme Actions
      updateThemeAppearance: (appearance) => {
        const currentTheme = get().theme;
        set({
          theme: {
            ...currentTheme,
            appearance: { ...currentTheme.appearance, ...appearance },
          },
          themeHasChanges: true,
        });
      },

      updateThemeLayout: (layout) => {
        const currentTheme = get().theme;
        set({
          theme: {
            ...currentTheme,
            layout: { ...currentTheme.layout, ...layout },
          },
          themeHasChanges: true,
        });
      },

      updateThemeAccessibility: (accessibility) => {
        const currentTheme = get().theme;
        set({
          theme: {
            ...currentTheme,
            accessibility: { ...currentTheme.accessibility, ...accessibility },
          },
          themeHasChanges: true,
        });
      },

      // System Actions
      updateSystemClinic: (clinic) => {
        const currentSystem = get().system;
        set({
          system: {
            ...currentSystem,
            clinic: { ...currentSystem.clinic, ...clinic },
          },
          systemHasChanges: true,
        });
      },

      updateSystemBusiness: (business) => {
        const currentSystem = get().system;
        set({
          system: {
            ...currentSystem,
            business: { ...currentSystem.business, ...business },
          },
          systemHasChanges: true,
        });
      },

      updateSystemTechnical: (technical) => {
        const currentSystem = get().system;
        set({
          system: {
            ...currentSystem,
            technical: { ...currentSystem.technical, ...technical },
          },
          systemHasChanges: true,
        });
      },

      updateSystemIntegrations: (integrations) => {
        const currentSystem = get().system;
        set({
          system: {
            ...currentSystem,
            integrations: { ...currentSystem.integrations, ...integrations },
          },
          systemHasChanges: true,
        });
      },

      // Save Actions
      saveSchedule: async () => {
        set({ isLoading: true, error: null });
        try {
          const schedule = get().schedule;
          console.log("Saving schedule to API:", schedule);

          // Convert store schedule format to API format
          const apiScheduleFormat = convertStoreScheduleToApiFormat(schedule);

          const response = await updateClinicSettings({
            weeklySchedule: apiScheduleFormat,
            timezone: "Asia/Riyadh", // You can make this configurable
          });

          if (response.success) {
            set({
              scheduleHasChanges: false,
              isLoading: false,
              hasWeeklySchedule: true,
              needsInitialization: false,
            });
            return {
              success: true,
              message: response.message || "تم حفظ جدول العمل بنجاح",
            };
          } else {
            throw new Error(response.message || "فشل في حفظ جدول العمل");
          }
        } catch (error) {
          console.error("Error saving schedule:", error);
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: error.message || "حدث خطأ أثناء حفظ جدول العمل",
          };
        }
      },

      saveProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const profile = get().profile;
          console.log("Saving profile:", profile);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ profileHasChanges: false, isLoading: false });
          return { success: true, message: "تم حفظ الملف الشخصي بنجاح" };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, message: "حدث خطأ أثناء حفظ الملف الشخصي" };
        }
      },

      saveNotifications: async () => {
        set({ isLoading: true, error: null });
        try {
          const notifications = get().notifications;
          console.log("Saving notifications:", notifications);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ notificationsHasChanges: false, isLoading: false });
          return { success: true, message: "تم حفظ إعدادات الإشعارات بنجاح" };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: "حدث خطأ أثناء حفظ إعدادات الإشعارات",
          };
        }
      },

      saveTheme: async () => {
        set({ isLoading: true, error: null });
        try {
          const theme = get().theme;
          console.log("Saving theme:", theme);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ themeHasChanges: false, isLoading: false });
          return { success: true, message: "تم حفظ إعدادات المظهر بنجاح" };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: "حدث خطأ أثناء حفظ إعدادات المظهر",
          };
        }
      },

      saveSystem: async () => {
        set({ isLoading: true, error: null });
        try {
          const system = get().system;
          console.log("Saving system:", system);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ systemHasChanges: false, isLoading: false });
          return { success: true, message: "تم حفظ إعدادات النظام بنجاح" };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: "حدث خطأ أثناء حفظ إعدادات النظام",
          };
        }
      },

      // Initialize weekly schedule
      initializeWeeklySchedule: async () => {
        set({ isLoading: true, error: null });
        try {
          // Set default schedule first
          const defaultSchedule = {
            sunday: { enabled: false, shifts: [] },
            monday: {
              enabled: true,
              shifts: [{ startTime: "09:00", endTime: "17:00" }],
            },
            tuesday: {
              enabled: true,
              shifts: [{ startTime: "09:00", endTime: "17:00" }],
            },
            wednesday: {
              enabled: true,
              shifts: [{ startTime: "09:00", endTime: "17:00" }],
            },
            thursday: {
              enabled: true,
              shifts: [{ startTime: "09:00", endTime: "17:00" }],
            },
            friday: {
              enabled: true,
              shifts: [{ startTime: "09:00", endTime: "12:00" }],
            },
            saturday: { enabled: false, shifts: [] },
          };

          set({ schedule: defaultSchedule });

          // Convert and save to API
          const apiScheduleFormat =
            convertStoreScheduleToApiFormat(defaultSchedule);

          const response = await updateClinicSettings({
            weeklySchedule: apiScheduleFormat,
            timezone: "Asia/Riyadh",
          });

          if (response.success) {
            set({
              scheduleHasChanges: false,
              isLoading: false,
              hasWeeklySchedule: true,
              needsInitialization: false,
            });
            return {
              success: true,
              message: "تم إنشاء جدول العمل الافتراضي بنجاح",
            };
          } else {
            throw new Error(response.message || "فشل في إنشاء جدول العمل");
          }
        } catch (error) {
          console.error("Error initializing schedule:", error);
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: error.message || "حدث خطأ أثناء إنشاء جدول العمل",
          };
        }
      },

      // Reset settings to defaults (calls DELETE API)
      resetSettings: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await deleteClinicSettings();

          if (response.success) {
            // Reset local state
            const emptySchedule = {
              sunday: { enabled: false, shifts: [] },
              monday: { enabled: false, shifts: [] },
              tuesday: { enabled: false, shifts: [] },
              wednesday: { enabled: false, shifts: [] },
              thursday: { enabled: false, shifts: [] },
              friday: { enabled: false, shifts: [] },
              saturday: { enabled: false, shifts: [] },
            };

            set({
              schedule: emptySchedule,
              scheduleHasChanges: false,
              isLoading: false,
              hasWeeklySchedule: false,
              needsInitialization: true,
              apiSettings: null,
            });

            return {
              success: true,
              message: response.message || "تم إعادة تعيين الإعدادات بنجاح",
            };
          } else {
            throw new Error(response.message || "فشل في إعادة تعيين الإعدادات");
          }
        } catch (error) {
          console.error("Error resetting settings:", error);
          set({ error: error.message, isLoading: false });
          return {
            success: false,
            message: error.message || "حدث خطأ أثناء إعادة تعيين الإعدادات",
          };
        }
      },

      // Utility Actions
      clearError: () => set({ error: null }),

      resetChanges: (section) => {
        switch (section) {
          case "schedule":
            set({ scheduleHasChanges: false });
            break;
          case "profile":
            set({ profileHasChanges: false });
            break;
          case "notifications":
            set({ notificationsHasChanges: false });
            break;
          case "theme":
            set({ themeHasChanges: false });
            break;
          case "system":
            set({ systemHasChanges: false });
            break;
          default:
            set({
              scheduleHasChanges: false,
              profileHasChanges: false,
              notificationsHasChanges: false,
              themeHasChanges: false,
              systemHasChanges: false,
            });
        }
      },

      // Load initial data
      loadSettings: async () => {
        set({ isLoading: true, error: null });
        try {
          console.log("Loading settings from API...");

          const response = await getClinicSettings();

          if (response.success && response.data) {
            const { settings, formattedSchedule } = response.data;

            // Check if weekly schedule exists and is not empty
            const hasSchedule =
              settings.weeklySchedule &&
              Object.keys(settings.weeklySchedule).length > 0;

            // Convert API schedule format to store format if it exists
            let convertedSchedule = null;
            if (hasSchedule && formattedSchedule) {
              convertedSchedule =
                convertApiScheduleToStoreFormat(formattedSchedule);
            }

            set({
              isLoading: false,
              apiSettings: settings,
              hasWeeklySchedule: hasSchedule,
              needsInitialization: !hasSchedule,
              // Update schedule if we have one from API
              ...(convertedSchedule && { schedule: convertedSchedule }),
            });

            return {
              success: true,
              hasSchedule,
              needsInitialization: !hasSchedule,
              message: hasSchedule
                ? "تم تحميل الإعدادات بنجاح"
                : "لم يتم العثور على جدول عمل. يرجى إنشاء واحد.",
            };
          }

          set({ isLoading: false });
          return { success: true, needsInitialization: true };
        } catch (error) {
          console.error("Error loading settings:", error);
          set({
            error: error.message || "فشل في تحميل الإعدادات",
            isLoading: false,
            needsInitialization: true,
          });
          return {
            success: false,
            message: error.message || "فشل في تحميل الإعدادات",
          };
        }
      },
    }),
    {
      name: "clinic-settings-storage",
      partialize: (state) => ({
        schedule: state.schedule,
        profile: state.profile,
        notifications: state.notifications,
        theme: state.theme,
        system: state.system,
      }),
    }
  )
);

// Helper function to convert API schedule format to store format
function convertApiScheduleToStoreFormat(formattedSchedule) {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const schedule = {};

  days.forEach((day) => {
    const daySchedule = formattedSchedule[day];

    if (
      !daySchedule ||
      daySchedule.includes("Closed") ||
      daySchedule.length === 0
    ) {
      schedule[day] = { enabled: false, shifts: [] };
    } else {
      schedule[day] = {
        enabled: true,
        shifts: daySchedule.map((timeRange) => {
          const [startTime, endTime] = timeRange.split(" - ");
          return { startTime, endTime };
        }),
      };
    }
  });

  return schedule;
}

// Helper function to convert store schedule format to API format
function convertStoreScheduleToApiFormat(schedule) {
  const apiFormat = {};

  Object.keys(schedule).forEach((day) => {
    const daySchedule = schedule[day];

    if (!daySchedule.enabled || daySchedule.shifts.length === 0) {
      apiFormat[day] = [];
    } else {
      apiFormat[day] = daySchedule.shifts.map(
        (shift) => `${shift.startTime} - ${shift.endTime}`
      );
    }
  });

  return apiFormat;
}

export default useSettingsStore;
