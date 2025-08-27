import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Role-based navigation utility
export function getNavigationPathByRole(role) {
  const roleRoutes = {
    patient: "/patient-profile",
    doctor: "/doctor-dashboard",
    staff: "/staff-dashboard",
  };

  return roleRoutes[role] || "/";
}

// Navigate user based on their role
export function navigateByRole(navigate, role) {
  const path = getNavigationPathByRole(role);
  navigate(path);
}
