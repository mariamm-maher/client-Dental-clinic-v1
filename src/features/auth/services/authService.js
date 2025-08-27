// here we call the axios config and the API calls for the login, register and reset password
import apiClient from "@/config/axiosConfig";

export const register = async (userData) => {
  try {
    const response = await apiClient.post("/api/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post("/api/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Send forgot password email
 * @param {string} email - User's email address
 * @returns {Promise<Object>} API response
 */
export const forgetPassword = async (email) => {
  try {
    const response = await apiClient.post("/api/auth/forgot-password", {
      email,
    });

    return response.data;
  } catch (error) {
    console.error("Forget Password API Error:", error);

    throw error.response.data;
  }
};

export const refreshAuthToken = async () => {
  try {
    console.log("🔄 Calling refresh token API (GET request)...");
    
    // Refresh token is sent via HTTP-only cookie automatically
    const response = await apiClient.get("/api/auth/refresh-token");
    
    console.log("✅ Refresh token API response:", response.data);
    
    // Expected response format:
    // {
    //   "success": true,
    //   "message": "Token refreshed successfully",
    //   "data": {
    //     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.newtoken.signature"
    //   }
    // }
    
    if (response.data?.success && response.data?.data?.accessToken) {
      const newAccessToken = response.data.data.accessToken;
      console.log("✅ New access token received:", `${newAccessToken.substring(0, 20)}...`);
      
      // Update Zustand store with new access token
      try {
        // Dynamic import to avoid circular dependencies
        const { default: useAuthStore } = await import("@/stores/authStore");
        
        // Get the store instance and update the access token
        const authStore = useAuthStore.getState();
        console.log("🔄 Updating Zustand store with new access token...");
        
        // Update the access token in the store
        authStore.setAccessToken(newAccessToken);
        
        console.log("✅ Successfully updated Zustand store with new access token");
        
        // Also update axios default headers for immediate use
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        console.log("✅ Updated axios default headers with new token");
        
      } catch (storeError) {
        console.error("❌ Failed to update Zustand store:", storeError);
        // Continue anyway, the axios interceptor will handle localStorage update
      }
    }

    return response.data;
  } catch (error) {
    console.error("❌ Refresh Token API Error:", error);
    console.error("❌ Error details:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    throw error.response?.data || error.message;
  }
};

/**
 * Confirm password reset with new password
 * @param {string} token - Reset token from email
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} API response
 */
export const confirmPasswordReset = async (token, newPassword) => {
  try {
    const response = await apiClient.post("/api/auth/reset-password", {
      token,
      newPassword,
    });

    return response.data;
  } catch (error) {
    console.error("Confirm Password Reset API Error:", error);
    throw error.response.data;
  }
};

//google redirect URL
