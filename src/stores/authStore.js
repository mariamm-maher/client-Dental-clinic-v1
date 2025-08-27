import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiClient from "@/config/axiosConfig";
import {
  register,
  login,
  forgetPassword as forgetPasswordService,
  refreshAuthToken,
  confirmPasswordReset,
} from "@/features/auth/services/authService";

// Define the initial state
const initialState = {
  user: null,
  accessToken: "",
  role: "",
  isAuthenticated: false,
};

// Create the authentication store with persistence
const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      ...initialState,

      // Actions
      signIn: async (userData) => {
        try {
          const result = await login(userData);
          console.log("Sign in result in the suztand:", result);
          if (result.success) {
            const { name, accessToken, role, userId } = result.data;

            // Create user object with userId
            const user = {
              name,
              userId,
            };

            // Update store state
            set({
              user,
              accessToken,
              role,
              isAuthenticated: true,
            });

            // Set token in axios default headers
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            return { success: true, data: result.data };
          } else {
            // Clear any partial state on error
            set({
              user: null,
              accessToken: "",
              role: "",
              isAuthenticated: false,
            });

            return {
              success: false,
              error: "result is not successful",
            };
          }
        } catch (error) {
          console.error("Sign in error from zustand:", error);
          // Clear any partial state on error
          set({
            user: null,
            accessToken: "",
            role: "",
            isAuthenticated: false,
          });

          throw error;
        }
      },

      signInWithGoogle: ({ name, accessToken, role, userId }) => {
        const user = {
          name,
          userId,
        };

        set({
          user,
          accessToken,
          role,
          isAuthenticated: true,
        });

        // Set token in axios
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      },
      signUp: async (newUserData) => {
        return await register(newUserData);
      },
      forgetPassword: async (email) => {
        try {
          const result = await forgetPasswordService(email);
          return {
            success: result.success,
            message: result.message,
            error: result.error,
          };
        } catch (error) {
          console.error("Forget password error:", error);
          throw error;
        }
      },

      confirmPasswordReset: async (token, newPassword) => {
        try {
          const result = await confirmPasswordReset(token, newPassword);
          return {
            success: result.success || true,
            message: result.message || "Password reset successfully",
            data: result.data,
          };
        } catch (error) {
          console.error("Confirm password reset error:", error);
          throw error;
        }
      },

      refreshToken: async () => {
        try {
          // Call refresh token API (refresh token sent via HTTP-only cookie)
          const result = await refreshAuthToken();

          if (result.success) {
            const { accessToken: newToken, user, role } = result.data;

            // Update store state with new token
            set({
              user: user || get().user,
              accessToken: newToken,
              role: role || get().role,
              isAuthenticated: true,
            });

            // Update axios default headers
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;

            return { success: true, token: newToken };
          } else {
            // If refresh fails, clear auth state
            get().signOut();

            return {
              success: false,
              error: result.error,
            };
          }
        } catch (error) {
          console.error("Token refresh error:", error);

          // If refresh fails, clear auth state
          get().signOut();

          return {
            success: false,
            error: "Token refresh failed",
          };
        }
      },

      signOut: () => {
        // Clear axios authorization header
        delete apiClient.defaults.headers.common["Authorization"];

        // Reset store to initial state
        set(initialState);

        console.log("User signed out successfully");
      }, // Helper methods - optimized to avoid unnecessary get() calls
      hasRole: (requiredRole) => {
        const state = get();
        return state.isAuthenticated && state.role === requiredRole;
      },

      hasAnyRole: (requiredRoles) => {
        const state = get();
        return state.isAuthenticated && requiredRoles.includes(state.role);
      },

      getUser: () => {
        return get().user;
      },

      getToken: () => {
        return get().accessToken;
      },

      // Set access token (used by refresh token flow)
      setAccessToken: (newAccessToken) => {
        console.log("🔄 Setting new access token in Zustand store...");
        
        set({
          accessToken: newAccessToken,
          isAuthenticated: true,
        });
        
        // Update axios headers immediately
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        
        console.log("✅ Access token updated in Zustand store and axios headers");
      },

      // Initialize auth state (call this on app startup)
      initializeAuth: () => {
        const { accessToken } = get();

        if (accessToken) {
          // Set token in axios headers if it exists in persisted state
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${accessToken}`;

          // TODO: Optionally validate token with server
          // get().refreshToken();
        }
      },
    }),
    {
      name: "clinic-auth-store", // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        accessToken: state.accessToken,
        role: state.role,
        isAuthenticated: state.isAuthenticated,
      }),
      // Optional: handle hydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Initialize auth headers when store is rehydrated
          state.initializeAuth();
        }
      },
    }
  )
);

export default useAuthStore;
