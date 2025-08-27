import { useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores";
import Unauthorized from "./Unauthorized";

const ProtectedRoute = memo(
  ({
    roles = null,
    children,
    fallbackPath = "/login",
    showErrorPage = true,
    requireAuthentication = true,
  }) => {
    const navigate = useNavigate();

    // Use separate selectors to avoid infinite loop issues
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const role = useAuthStore((state) => state.role);

    // Memoize role access check to prevent recalculation on every render
    const hasAccess = useMemo(() => {
      if (!roles) return true;
      if (!isAuthenticated) return false;

      if (typeof roles === "string") {
        return role === roles;
      } else if (Array.isArray(roles)) {
        return roles.includes(role);
      }
      return false;
    }, [roles, role, isAuthenticated]);

    // Handle authentication redirect only when needed
    useEffect(() => {
      if (requireAuthentication && !isAuthenticated) {
        navigate(fallbackPath);
      }
    }, [requireAuthentication, isAuthenticated, navigate, fallbackPath]);

    // Early returns for better performance
    if (requireAuthentication && !isAuthenticated) {
      return null;
    }

    if (!roles) {
      return children;
    }

    if (hasAccess) {
      return children;
    }

    if (showErrorPage) {
      const requiredRole = typeof roles === "string" ? roles : null;
      const requiredRoles = Array.isArray(roles) ? roles : null;
      return (
        <Unauthorized
          requiredRole={requiredRole}
          requiredRoles={requiredRoles}
        />
      );
    }
    return null;
  }
);

ProtectedRoute.displayName = "ProtectedRoute";

export default ProtectedRoute;
