import { create } from "zustand";
import { toast } from "sonner";
import { getAllPatients } from "@/features/staff-dashboard/services/staffServices";

const usePatientSearchStore = create((set, get) => ({
  // State
  searchTerm: "",
  searchType: "all",
  selectedPatient: null,
  
  // API data
  patients: [],
  filteredPatients: [],
  displayedPatients: [], // For pagination
  isLoading: false,
  error: null,

  // Pagination state
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  totalPages: 0,

  // Sorting state
  sortBy: "createdAt", // "createdAt", "name", "lastVisit"
  sortOrder: "desc", // "asc", "desc"
  // Actions
  setSearchTerm: (term) => {
    set({ searchTerm: term, currentPage: 1 }); // Reset to first page when searching
    get().filterAndPaginatePatients();
  },
  
  setSearchType: (type) => {
    set({ searchType: type, currentPage: 1 });
    get().filterAndPaginatePatients();
  },

  setSortBy: (sortBy) => {
    set({ sortBy, currentPage: 1 });
    get().filterAndPaginatePatients();
  },

  setSortOrder: (sortOrder) => {
    set({ sortOrder, currentPage: 1 });
    get().filterAndPaginatePatients();
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().filterAndPaginatePatients();
  },

  setItemsPerPage: (itemsPerPage) => {
    set({ itemsPerPage, currentPage: 1 });
    get().filterAndPaginatePatients();
  },

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),

  // Fetch all patients from API
  fetchAllPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getAllPatients();
      if (result.success) {
        // Extract and transform patient data from API response
        const patientsData =
          result.data?.data?.patients || result.data?.patients || [];

        const transformedPatients = patientsData.map((patient) => ({
          id: patient._id,
          name: patient.generalInfo?.name || "غير محدد",
          phone: patient.generalInfo?.phone || "غير متوفر",
          email: patient.generalInfo?.email || "غير متوفر",
          address: patient.generalInfo?.address || "غير متوفر",
          dateOfBirth: patient.generalInfo?.dateOfBirth || null,
          status: patient.status || "active",
          lastVisit: patient.lastVisit
            ? new Date(patient.lastVisit).toLocaleDateString("ar")
            : "لا توجد زيارات",
          totalVisits: patient.totalVisits || 0,
          services: patient.services || [],
          upcomingAppointments: patient.upcomingAppointments || [],
          notes: patient.notes || "",
          createdAt: patient.createdAt,
          // Keep original data for reference
          originalData: patient,
        }));        set({ 
          patients: transformedPatients, 
          isLoading: false 
        });
        
        // Apply current filters and pagination
        get().filterAndPaginatePatients();
      } else {
        set({
          patients: [],
          isLoading: false,
          error: result.message || "فشل في جلب بيانات المرضى",
        });
        toast.error(result.message || "فشل في جلب بيانات المرضى");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      set({
        patients: [],
        isLoading: false,
        error: error.message || "حدث خطأ أثناء جلب بيانات المرضى",
      });
      toast.error(error.message || "حدث خطأ أثناء جلب بيانات المرضى");
    }
  },
  // Filter, sort and paginate patients
  filterAndPaginatePatients: () => {
    const { patients, searchTerm, searchType, sortBy, sortOrder, currentPage, itemsPerPage } = get();

    // Step 1: Filter patients
    let filtered;
    if (!searchTerm || searchTerm.trim() === "") {
      // Show all patients when no search term
      filtered = [...patients];
    } else {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = patients.filter((patient) => {
        switch (searchType) {
          case "name":
            return patient.name.toLowerCase().includes(searchLower);
          case "phone":
            return patient.phone.includes(searchTerm.trim());
          case "email":
            return patient.email.toLowerCase().includes(searchLower);
          default:
            return (
              patient.name.toLowerCase().includes(searchLower) ||
              patient.phone.includes(searchTerm.trim()) ||
              patient.email.toLowerCase().includes(searchLower)
            );
        }
      });
    }

    // Step 2: Sort patients
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "lastVisit":
          aValue = a.lastVisit === "لا توجد زيارات" ? new Date(0) : new Date(a.createdAt);
          bValue = b.lastVisit === "لا توجد زيارات" ? new Date(0) : new Date(b.createdAt);
          break;
        case "createdAt":
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });

    // Step 3: Calculate pagination
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedPatients = filtered.slice(startIndex, endIndex);

    set({ 
      filteredPatients: filtered,
      displayedPatients,
      totalItems,
      totalPages
    });
  },

  // Get displayed patients for current page
  getDisplayedPatients: () => {
    return get().displayedPatients;
  },

  // Get filtered patients (for backward compatibility)
  getFilteredPatients: () => {
    return get().filteredPatients;
  },

  // Navigate to next page
  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages) {
      get().setCurrentPage(currentPage + 1);
    }
  },

  // Navigate to previous page
  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 1) {
      get().setCurrentPage(currentPage - 1);
    }
  },
  },

  // Get statistics
  getStatistics: () => {
    const { patients } = get();

    const activePatients = patients.filter((p) => p.status === "active");
    const recentVisits = patients.filter((p) => {
      if (!p.lastVisit || p.lastVisit === "لا توجد زيارات") return false;
      // Parse Arabic date or check if it's within last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return new Date(p.createdAt) > thirtyDaysAgo;
    });

    return {
      total: patients.length,
      active: activePatients.length,
      recent: recentVisits.length,
    };
  },

  // Utility functions
  getStatusBadge: (status) => {
    const statusConfig = {
      active: {
        label: "نشط",
        className: "bg-emerald-100 text-emerald-700 border-emerald-200",
      },
      inactive: {
        label: "غير نشط",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      },
      blocked: {
        label: "محظور",
        className: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return (
      statusConfig[status] || {
        label: "غير معروف",
        className: "bg-gray-100 text-gray-700 border-gray-200",
      }
    );
  },

  calculateAge: (dateOfBirth) => {
    if (!dateOfBirth) return "غير محدد";

    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  },

  getColorClasses: (color, type = "bg") => {
    const colors = {
      sky: {
        bg: "bg-sky-100",
        text: "text-sky-700",
        border: "border-sky-200",
        icon: "text-sky-600",
      },
      emerald: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
        icon: "text-emerald-600",
      },
      violet: {
        bg: "bg-violet-100",
        text: "text-violet-700",
        border: "border-violet-200",
        icon: "text-violet-600",
      },
    };
    return colors[color]?.[type] || colors.sky[type];
  },

  // Refresh patients data
  refreshPatients: () => {
    get().fetchAllPatients();
  },

  // Clear search and filters
  clearSearch: () => {
    set({
      searchTerm: "",
      filteredPatients: [],
      selectedPatient: null,
    });
  },
}));

export default usePatientSearchStore;
