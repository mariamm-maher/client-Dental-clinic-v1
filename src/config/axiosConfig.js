import axios from "axios";

// Base URL for the API server
const API_BASE_URL = "http://localhost:4000";

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Enable sending cookies for refresh token
});

// Request interceptor - Add access token to headers
apiClient.interceptors.request.use(
  (config) => {
    // Get access token from Zustand store
    // We need to import the store dynamically to avoid circular dependencies
    let accessToken = null;
    
    try {
      const authStoreData = localStorage.getItem('clinic-auth-store');
      console.log("🔍 Raw auth store data:", authStoreData);
      
      if (authStoreData) {
        const authStore = JSON.parse(authStoreData);
        console.log("🔍 Parsed auth store:", authStore);
        
        // Try different possible structures for Zustand persist
        accessToken = authStore.state?.accessToken || authStore.accessToken;
        
        console.log("🔍 Extracted access token:", accessToken ? `${accessToken.substring(0, 20)}...` : 'null');
      } else {
        console.log("🔍 No auth store data found in localStorage");
      }
      
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log("✅ Added Authorization header to request");
      } else if (!accessToken) {
        console.log("⚠️ No access token available for request");
      } else {
        console.log("ℹ️ Authorization header already exists");
      }
    } catch (error) {
      console.error("❌ Failed to get access token from store:", error);
    }

    console.log("🚀 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      hasAuth: !!config.headers.Authorization,
      authHeader: config.headers.Authorization ? `${config.headers.Authorization.substring(0, 20)}...` : 'none',
    });

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh on 403 responses
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      status: response.status,
      url: response.config.url,
      success: response.data?.success,
    });

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;

      console.error("❌ API Error Response:", {
        status,
        url: originalRequest?.url,
        data,
      });

      // Handle 403 responses with invalid/expired token message
      console.log("🔍 Checking 403 response for token refresh:", {
        status,
        message: data?.message,
        success: data?.success,
        details: data?.details
      });

      if (status === 403 && 
          data?.message && 
          (data.message.toLowerCase().includes('invalid access token') || 
           data.message.toLowerCase().includes('expired') || 
           data.message.toLowerCase().includes('token is  expired or invalid'))) {
        
        console.log("🎯 403 response matches token expiry pattern, attempting refresh...");
        
        // Prevent infinite retry loops
        if (!originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("🔄 Starting token refresh process...");
            console.log("🔄 Original request details:", {
              url: originalRequest.url,
              method: originalRequest.method,
              hasAuthHeader: !!originalRequest.headers?.Authorization
            });
            
            // Import refresh token function dynamically to avoid circular dependency
            const { refreshAuthToken } = await import("@/features/auth/services/authService");
            console.log("✅ Successfully imported refreshAuthToken function");
            
            // Call refresh token API (refresh token is sent via HTTP-only cookie)
            console.log("🔄 Calling refresh token API...");
            const refreshResponse = await refreshAuthToken();
            console.log("🔍 Refresh token API response:", refreshResponse);
            
            if (refreshResponse?.success && refreshResponse?.data?.accessToken) {
              const newAccessToken = refreshResponse.data.accessToken;
              console.log("✅ New access token received:", `${newAccessToken.substring(0, 20)}...`);
              
              // Update the token in localStorage (Zustand store)
              try {
                const authStoreData = localStorage.getItem('clinic-auth-store');
                console.log("🔍 Current auth store before update:", authStoreData);
                
                const authStore = JSON.parse(authStoreData || '{}');
                
                // Handle different Zustand persist structures
                if (authStore.state) {
                  authStore.state.accessToken = newAccessToken;
                  authStore.state.isAuthenticated = true;
                } else {
                  // Fallback structure
                  authStore.accessToken = newAccessToken;
                  authStore.isAuthenticated = true;
                }
                
                localStorage.setItem('clinic-auth-store', JSON.stringify(authStore));
                console.log("✅ Updated token in localStorage store");
                
                // Verify the update
                const updatedStore = localStorage.getItem('clinic-auth-store');
                console.log("🔍 Auth store after update:", updatedStore);
                
              } catch (storeError) {
                console.error("❌ Failed to update token in store:", storeError);
              }
              
              // Update the original request with new token
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              console.log("✅ Updated original request with new token");
              
              console.log("🔄 Retrying original request with new token...");
              
              // Retry the original request with new token
              return apiClient(originalRequest);
            } else {
              console.error("❌ Token refresh failed - invalid response structure:", refreshResponse);
              throw new Error(`Token refresh failed - no new token received. Response: ${JSON.stringify(refreshResponse)}`);
            }
          } catch (refreshError) {
            console.error("❌ Token refresh process failed:", refreshError);
            console.error("❌ Refresh error details:", {
              message: refreshError.message,
              response: refreshError.response?.data,
              status: refreshError.response?.status
            });
            
            // Clear auth state and redirect to login
            try {
              console.log("🧹 Clearing auth state and redirecting to login...");
              localStorage.removeItem('clinic-auth-store');
              // Redirect to login page
              window.location.href = '/login';
            } catch (clearError) {
              console.error("❌ Failed to clear auth state:", clearError);
            }
            
            return Promise.reject(refreshError);
          }
        } else {
          console.log("⚠️ Request already retried, not attempting refresh again");
        }
      }

      // Handle other status codes
      switch (status) {
        case 401:
          console.warn("⚠️ Unauthorized access");
          break;
        case 404:
          console.warn("⚠️ Resource not found");
          break;
        case 422:
          console.warn("⚠️ Validation error:", data);
          break;
        case 429:
          console.warn("⚠️ Rate limit exceeded");
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          console.error("🔥 Server error - please try again later");
          break;
        default:
          console.error("❌ Unexpected error:", status, data);
      }
    } else if (error.request) {
      // Network error - no response received
      console.error("🌐 Network Error:", error.message);
    } else {
      // Request setup error
      console.error("⚙️ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default apiClient;

// Export base URL for use in other files
export { API_BASE_URL };
