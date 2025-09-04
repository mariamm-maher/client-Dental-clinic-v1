import apiClient from "@/config/axiosConfig";

// Patient Services for Staff Dashboard

/**
 * Get all patients for staff
 * GET /api/patients/staff
 */
export const getAllPatients = async () => {
  try {
    const response = await apiClient.get("/api/patients/staff");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching all patients:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في جلب بيانات المرضى",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Get patient by ID for staff
 * GET /api/patients/staff/{patientId}
 */
export const getPatientById = async (patientId) => {
  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const response = await apiClient.get(`/api/patients/staff/${patientId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في جلب بيانات المريض",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Create new patient profile
 * POST /api/patients
 */
export const createPatient = async (patientData) => {
  try {
    if (!patientData) {
      throw new Error("Patient data is required");
    }

    const response = await apiClient.post("/api/patients", patientData);
    return {
      success: true,
      data: response.data,
      message: "تم إنشاء ملف المريض بنجاح",
    };
  } catch (error) {
    console.error("Error creating patient:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في إنشاء ملف المريض",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Search patients with filters
 * GET /api/patients/search with query parameters
 */
export const searchPatients = async (value) => {
  try {
    const response = await apiClient.get(`/api/patients/search?name=${value}`);
    console.log(response.data, "response from search patients");
    return {
      success: true,
      data: response.data?.data?.patients || [],
    };
  } catch (error) {
    console.error("Error searching patients:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "فشل في البحث عن المرضى",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Search patients by name or phone number
 * GET /api/patients/search/name-or-phone with query parameter
 */
export const searchPatientsByNameOrPhone = async (query) => {
  try {
    if (!query || query.trim().length < 2) {
      return {
        success: true,
        data: [],
      };
    }

    const response = await apiClient.get(
      `/api/patients/search/name-or-phone?query=${encodeURIComponent(
        query.trim()
      )}`
    );
    console.log(
      response.data,
      "response from search patients by name or phone"
    );
    return {
      success: true,
      data: response.data?.data?.patients || [],
    };
  } catch (error) {
    console.error("Error searching patients by name or phone:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "فشل في البحث عن المرضى",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Update patient information
 * PUT /api/patients/{patientId}
 */
export const updatePatient = async (patientId, patientData) => {
  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }
    if (!patientData) {
      throw new Error("Patient data is required");
    }

    const response = await apiClient.put(
      `/api/patients/${patientId}`,
      patientData
    );
    return {
      success: true,
      data: response.data,
      message: "تم تحديث بيانات المريض بنجاح",
    };
  } catch (error) {
    console.error("Error updating patient:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في تحديث بيانات المريض",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Delete patient
 * DELETE /api/patients/{patientId}
 */
export const deletePatient = async (patientId) => {
  try {
    if (!patientId) {
      throw new Error("Patient ID is required");
    }

    const response = await apiClient.delete(`/api/patients/${patientId}`);
    return {
      success: true,
      data: response.data,
      message: "تم حذف ملف المريض بنجاح",
    };
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في حذف ملف المريض",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Get latest patients
 * GET /api/patients/latest
 */
export const getLatestPatients = async () => {
  try {
    const response = await apiClient.get("/api/patients/latest");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching latest patients:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في جلب أحدث المرضى",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Create new appointment
 * POST /api/appointments
 */
export const createAppointment = async (appointmentData) => {
  try {
    if (!appointmentData) {
      throw new Error("Appointment data is required");
    }

    const response = await apiClient.post("/api/booking", appointmentData);
    return {
      success: true,
      data: response.data,
      message: "تم حجز الموعد بنجاح",
    };
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في حجز الموعد",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Get today's appointments
 * GET /api/booking/today
 */
export const getTodaysAppointments = async () => {
  try {
    const response = await apiClient.get("/api/booking/today");
    // If the API returns 404, treat as empty data (no appointments yet)
    if (response.status === 404) {
      return {
        success: true,
        data: [],
        message: "لا توجد مواعيد لهذا اليوم حتى الآن.",
        notFound: true,
      };
    }
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    // If error is 404, treat as empty data (no appointments yet)
    if (error.response?.status === 404) {
      return {
        success: true,
        data: [],
        message: "لا توجد مواعيد لهذا اليوم حتى الآن.",
        notFound: true,
      };
    }
    console.error("Error fetching today's appointments:", error);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "فشل في جلب مواعيد اليوم",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Update appointment status
 * PATCH /api/booking/:bookingId/status
 * @param {string} bookingId - The ID of the booking to update
 * @param {string} status - The new status value (one of: "pending", "confirmed", "canceled", "done", "missed")
 */
export const updateAppointmentStatus = async (bookingId, status) => {
  try {
    if (!bookingId) throw new Error("Booking ID is required");
    if (
      !status ||
      !["pending", "confirmed", "canceled", "done", "missed"].includes(status)
    ) {
      throw new Error("Invalid status value");
    }
    const response = await apiClient.patch(`/api/booking/${bookingId}/status`, {
      status,
    });
    return {
      success: true,
      data: response.data,
      message: "تم تحديث حالة الموعد بنجاح",
    };
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return {
      success: false,
      message: error.response?.data?.message || "فشل في تحديث حالة الموعد",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Get clinic settings
 * GET /api/clinic-settings
 */
export const getClinicSettings = async () => {
  try {
    const response = await apiClient.get("/api/clinic-settings");
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching clinic settings:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في جلب إعدادات العيادة",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Update clinic settings
 * PUT /api/clinic-settings
 */
export const updateClinicSettings = async (settingsData) => {
  try {
    if (!settingsData) {
      throw new Error("Settings data is required");
    }

    const response = await apiClient.put("/api/clinic-settings", settingsData);
    return {
      success: true,
      data: response.data,
      message: "تم تحديث إعدادات العيادة بنجاح",
    };
  } catch (error) {
    console.error("Error updating clinic settings:", error);
    throw {
      success: false,
      message: error.response?.data?.message || "فشل في تحديث إعدادات العيادة",
      details: error.response?.data?.details || [],
    };
  }
};

/**
 * Delete clinic settings (reset to defaults)
 * DELETE /api/clinic-settings
 */
export const deleteClinicSettings = async () => {
  try {
    const response = await apiClient.delete("/api/clinic-settings");
    return {
      success: true,
      data: response.data,
      message: "تم إعادة تعيين إعدادات العيادة إلى الافتراضية",
    };
  } catch (error) {
    console.error("Error deleting clinic settings:", error);
    throw {
      success: false,
      message:
        error.response?.data?.message || "فشل في إعادة تعيين إعدادات العيادة",
      details: error.response?.data?.details || [],
    };
  }
};

// Export all services as default
export default {
  getAllPatients,
  getPatientById,
  createPatient,
  searchPatients,
  searchPatientsByNameOrPhone,
  createAppointment,
  updatePatient,
  deletePatient,
  getLatestPatients,
  getTodaysAppointments,
  updateAppointmentStatus,
  getClinicSettings,
  updateClinicSettings,
  deleteClinicSettings,
};
