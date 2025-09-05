import { create } from "zustand";
import {
  getClinicSettings,
  updateClinicSettings,
  resetClinicSettingsToDefault, // Added import
} from "@/features/staff-dashboard/services/staffServices";

const useSettingsStore = create((set, get) => ({
  // Schedule Settings - aligned with database schema

  weeklySchedule: [
    { day: "sunday", shifts: [] },
    { day: "monday", shifts: [] },
    { day: "tuesday", shifts: [] },
    { day: "wednesday", shifts: [] },
    { day: "thursday", shifts: [] },
    { day: "friday", shifts: [] },
    { day: "saturday", shifts: [] },
  ],

  scheduleHasChanges: false,
  timezone: "Africa/Cairo",
  // Loading states
  isLoading: false,
  error: null,

  hasWeeklySchedule: false,
  needsInitialization: false,
  // Schedule Actions
  setWeeklySchedule: (weeklySchedule) => {
    // Ensure weeklySchedule is an array format
    if (Array.isArray(weeklySchedule)) {
      set({
        weeklySchedule,
        scheduleHasChanges: true,
      });
    } else if (typeof weeklySchedule === "object" && weeklySchedule !== null) {
      // Convert old object format to new array format if needed
      const daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const arrayFormat = daysOfWeek.map((day) => ({
        day,
        shifts: weeklySchedule[day] || [],
      }));
      set({
        weeklySchedule: arrayFormat,
        scheduleHasChanges: true,
      });
    }
  },
  toggleDay: (dayKey) => {
    const currentSchedule = get().weeklySchedule;
    const dayIndex = currentSchedule.findIndex((d) => d.day === dayKey);
    if (dayIndex === -1) return;

    const dayObject = currentSchedule[dayIndex];
    const newShifts =
      dayObject.shifts.length === 0
        ? [
            {
              enabled: true,
              startHour: 9,
              startMinute: 0,
              endHour: 17,
              endMinute: 0,
            },
          ]
        : [];

    const updatedSchedule = [...currentSchedule];
    updatedSchedule[dayIndex] = { ...dayObject, shifts: newShifts };

    set({
      weeklySchedule: updatedSchedule,
      scheduleHasChanges: true,
    });
  },
  addShift: (dayKey) => {
    const currentSchedule = get().weeklySchedule;
    const dayIndex = currentSchedule.findIndex((d) => d.day === dayKey);
    if (dayIndex === -1) return;

    const dayObject = currentSchedule[dayIndex];
    const newShift = {
      enabled: true,
      startHour: 9,
      startMinute: 0,
      endHour: 17,
      endMinute: 0,
    };

    const updatedSchedule = [...currentSchedule];
    updatedSchedule[dayIndex] = {
      ...dayObject,
      shifts: [...dayObject.shifts, newShift],
    };

    set({
      weeklySchedule: updatedSchedule,
      scheduleHasChanges: true,
    });
  },
  removeShift: (dayKey, shiftIndex) => {
    const currentSchedule = get().weeklySchedule;
    const dayIndex = currentSchedule.findIndex((d) => d.day === dayKey);
    if (dayIndex === -1) return;

    const dayObject = currentSchedule[dayIndex];
    const updatedSchedule = [...currentSchedule];
    updatedSchedule[dayIndex] = {
      ...dayObject,
      shifts: dayObject.shifts.filter((_, index) => index !== shiftIndex),
    };

    set({
      weeklySchedule: updatedSchedule,
      scheduleHasChanges: true,
    });
  },
  updateShift: (dayKey, shiftIndex, updatedShift) => {
    const currentSchedule = get().weeklySchedule;
    const dayIndex = currentSchedule.findIndex((d) => d.day === dayKey);
    if (dayIndex === -1) return;

    const dayObject = currentSchedule[dayIndex];
    const updatedSchedule = [...currentSchedule];
    updatedSchedule[dayIndex] = {
      ...dayObject,
      shifts: dayObject.shifts.map((shift, index) =>
        index === shiftIndex ? { ...shift, ...updatedShift } : shift
      ),
    };

    set({
      weeklySchedule: updatedSchedule,
      scheduleHasChanges: true,
    });
  },

  // Utility functions for time formatting
  formatShift: (shift) => {
    const formatTime = (hour, minute) => {
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    };
    return `${formatTime(shift.startHour, shift.startMinute)} - ${formatTime(
      shift.endHour,
      shift.endMinute
    )}`;
  },

  // Get shifts for a specific day
  getDayShifts: (dayKey) => {
    const { weeklySchedule } = get();
    const dayObject = weeklySchedule.find((d) => d.day === dayKey);
    return dayObject ? dayObject.shifts : [];
  },

  // Get schedule summary
  getScheduleSummary: () => {
    const { weeklySchedule } = get();
    const summary = {
      totalDays: 0,
      totalShifts: 0,
      totalHours: 0,
    };

    weeklySchedule.forEach((dayObject) => {
      if (Array.isArray(dayObject.shifts) && dayObject.shifts.length > 0) {
        summary.totalDays++;
        summary.totalShifts += dayObject.shifts.length;

        dayObject.shifts.forEach((shift) => {
          if (shift.enabled) {
            const startMinutes = shift.startHour * 60 + shift.startMinute;
            const endMinutes = shift.endHour * 60 + shift.endMinute;
            summary.totalHours += (endMinutes - startMinutes) / 60;
          }
        });
      }
    });

    return summary;
  },

  // Save Actions
  saveSchedule: async () => {
    set({ isLoading: true, error: null });
    try {
      const { weeklySchedule } = get();
      console.log("Saving schedule to API:", weeklySchedule);

      const response = await updateClinicSettings({
        weeklySchedule,
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
  }, // Initialize weekly schedule
  initializeWeeklySchedule: async () => {
    set({ isLoading: true, error: null });
    try {
      // Call API to reset clinic settings to default
      const response = await resetClinicSettingsToDefault();
      console.log(response, "response from inital schedule");
      if (response.success && response.data) {
        const { weeklySchedule, timezone } = response.data;

        set({
          isLoading: false,
          hasWeeklySchedule: true,
          needsInitialization: false,
          weeklySchedule: weeklySchedule || [
            { day: "sunday", shifts: [] },
            { day: "monday", shifts: [] },
            { day: "tuesday", shifts: [] },
            { day: "wednesday", shifts: [] },
            { day: "thursday", shifts: [] },
            { day: "friday", shifts: [] },
            { day: "saturday", shifts: [] },
          ],
          timezone: timezone || "Africa/Cairo",
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
      set({
        error: error.message,
        isLoading: false,
        hasWeeklySchedule: false,
        needsInitialization: true,
      });
      return {
        success: false,
        message: error.message || "حدث خطأ أثناء إنشاء جدول العمل",
      };
    }
  },

  // Utility Actions
  clearError: () => set({ error: null }),
  // Load initial data
  loadSchedule: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getClinicSettings();
      console.log(response, "response from get clinic settings load schedule");
      if (response.success && response.data) {
        const { weeklySchedule, timezone } = response.data; // Check if weeklySchedule is an array with all 7 days

        set({
          isLoading: false,
          hasWeeklySchedule: true,
          weeklySchedule: weeklySchedule || [
            { day: "sunday", shifts: [] },
            { day: "monday", shifts: [] },
            { day: "tuesday", shifts: [] },
            { day: "wednesday", shifts: [] },
            { day: "thursday", shifts: [] },
            { day: "friday", shifts: [] },
            { day: "saturday", shifts: [] },
          ],
          timezone: timezone || "Africa/Cairo",
        });

        return {
          success: true,
          hasSchedule: true,

          message: "تم تحميل جدول العمل بنجاح",
        };
      }
      set({
        isLoading: false,
        needsInitialization: true,
        hasWeeklySchedule: false,
      });
      return { success: true, needsInitialization: true };
    } catch (error) {
      console.error("Error loading schedule:", error);

      if (error.message === "لا يوجد جدول للعيادة في الوقت الحالي") {
        set({
          isLoading: false,
          hasWeeklySchedule: false,
          needsInitialization: true,
          error: null,
        });
        return {
          success: true,
          hasSchedule: false,
          needsInitialization: true,
          message: "لا يوجد جدول للعيادة في الوقت الحالي",
        };
      }
      set({
        error: error.message || "فشل في تحميل جدول العمل",
        isLoading: false,
        needsInitialization: true,
        hasWeeklySchedule: false,
      });
      return {
        success: false,
        message: error.message || "فشل في تحميل جدول العمل",
      };
    }
  },

  // Validate shift
  validateShift: (shift) => {
    const startMinutes = shift.startHour * 60 + shift.startMinute;
    const endMinutes = shift.endHour * 60 + shift.endMinute;
    return {
      isValid: startMinutes < endMinutes,
      duration: (endMinutes - startMinutes) / 60,
    };
  },
}));

export default useSettingsStore;
