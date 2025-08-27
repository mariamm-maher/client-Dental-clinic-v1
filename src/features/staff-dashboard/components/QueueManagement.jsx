import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";

// Import our new modular components
import QueueHeader from "./queue/QueueHeader";
import QueueStats from "./queue/QueueStats";
import QueueFilters from "./queue/QueueFilters";
import PatientCard from "./queue/PatientCard";
import PatientTable from "./queue/PatientTable";
import EmptyQueueState from "./queue/EmptyQueueState";

export default function QueueManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState("box"); // "table" or "box"
  // Mock queue data with enhanced details
  const [queue, setQueue] = useState([
    {
      id: 1,
      patient: "Sarah Johnson",
      checkInTime: "09:25 AM",
      appointmentTime: "09:30 AM",
      status: "waiting",
      priority: "normal",
      estimatedWait: "التالي خلال قليل",
      roomPreference: "غرفة 1",
      notes: "تنظيف أسنان دوري",
      phoneNumber: "+1 (555) 123-4567",
      age: 34,
      reason: "فحص وتنظيف الأسنان",
      waitTime: 10,
      position: 1,
    },
    {
      id: 2,
      patient: "Michael Chen",
      checkInTime: "10:10 AM",
      appointmentTime: "10:15 AM",
      status: "in-progress",
      priority: "normal",
      estimatedWait: "قيد الفحص",
      roomPreference: "غرفة 2",
      notes: "حشو سن علوي",
      phoneNumber: "+1 (555) 234-5678",
      age: 45,
      reason: "حشو سن",
      waitTime: 5,
      position: 2,
    },
    {
      id: 3,
      patient: "Emma Davis",
      checkInTime: "10:55 AM",
      appointmentTime: "11:00 AM",
      status: "waiting",
      priority: "urgent",
      estimatedWait: "التالي",
      roomPreference: "غرفة 1",
      notes: "ألم شديد في الضرس",
      phoneNumber: "+1 (555) 345-6789",
      age: 28,
      reason: "خلع ضرس العقل",
      waitTime: 15,
      position: 3,
    },
    {
      id: 4,
      patient: "Robert Wilson",
      checkInTime: "11:20 AM",
      appointmentTime: "11:30 AM",
      status: "waiting",
      priority: "normal",
      estimatedWait: "20 دقيقة",
      roomPreference: "غرفة 3",
      notes: "تركيب تقويم مؤقت",
      phoneNumber: "+1 (555) 456-7890",
      age: 52,
      reason: "استشارة تجميل الأسنان",
      waitTime: 25,
      position: 4,
    },
    {
      id: 5,
      patient: "Lisa Anderson",
      checkInTime: "02:25 PM",
      appointmentTime: "02:30 PM",
      status: "on-hold",
      priority: "normal",
      estimatedWait: "قيد الانتظار",
      roomPreference: "غرفة 2",
      notes: "بانتظار نتيجة الأشعة",
      phoneNumber: "+1 (555) 567-8901",
      age: 39,
      reason: "تتويج سن أمامي",
      waitTime: 35,
      position: 5,
    },
  ]);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter queue based on search and filters
  const filteredQueue = queue.filter((patient) => {
    const matchesSearch =
      patient.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phoneNumber.includes(searchTerm) ||
      patient.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || patient.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || patient.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  // Handle queue actions
  const handleQueueAction = (patientId, action) => {
    setQueue((prev) => {
      switch (action) {
        case "call-next":
          return prev.map((patient) =>
            patient.id === patientId
              ? { ...patient, status: "in-progress" }
              : patient
          );
        case "complete":
          return prev.filter((patient) => patient.id !== patientId);
        case "hold":
          return prev.map((patient) =>
            patient.id === patientId
              ? { ...patient, status: "on-hold" }
              : patient
          );
        case "priority-high":
          return prev.map((patient) =>
            patient.id === patientId
              ? { ...patient, priority: "urgent" }
              : patient
          );
        case "priority-normal":
          return prev.map((patient) =>
            patient.id === patientId
              ? { ...patient, priority: "normal" }
              : patient
          );
        default:
          return prev;
      }
    });
  };

  // Handle position changes
  const handlePositionChange = (patientId, direction) => {
    setQueue((prev) => {
      const currentIndex = prev.findIndex((p) => p.id === patientId);
      if (currentIndex === -1) return prev;

      const newQueue = [...prev];
      const targetIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= newQueue.length) return prev;

      // Swap positions
      [newQueue[currentIndex], newQueue[targetIndex]] = [
        newQueue[targetIndex],
        newQueue[currentIndex],
      ];

      // Update position numbers
      return newQueue.map((patient, index) => ({
        ...patient,
        position: index + 1,
      }));
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "in-progress":
        return "default";
      case "waiting":
        return "secondary";
      case "on-hold":
        return "outline";
      default:
        return "secondary";
    }
  };
  const getPriorityBadgeVariant = (priority) => {
    switch (priority) {
      case "urgent":
        return "destructive";
      case "normal":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const getWaitTimeColor = (waitTime) => {
    if (waitTime > 30) return "text-red-600";
    if (waitTime > 15) return "text-amber-600";
    return "text-green-600";
  }; // Handle refresh
  const handleRefresh = () => {
    setCurrentTime(new Date());
    // In a real app, this would refetch data from the server
    console.log("Refreshing queue data...");
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setFilterPriority("all");
  };

  // Add patient (placeholder)
  const handleAddPatient = () => {
    console.log("Adding new patient to queue...");
    // In a real app, this would open an add patient modal
  };

  const queueStats = {
    total: queue.length,
    waiting: queue.filter((p) => p.status === "waiting").length,
    inProgress: queue.filter((p) => p.status === "in-progress").length,
    onHold: queue.filter((p) => p.status === "on-hold").length,
    urgent: queue.filter((p) => p.priority === "urgent").length,
  };

  const hasActiveFilters =
    searchTerm || filterStatus !== "all" || filterPriority !== "all";

  return (
    <TooltipProvider>
      <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-yellow-50/30 to-amber-50/30 min-h-screen">
        {/* Header Section */}
        <QueueHeader
          viewMode={viewMode}
          setViewMode={setViewMode}
          currentTime={currentTime}
          queueCount={filteredQueue.length}
          onRefresh={handleRefresh}
        />

        {/* Queue Statistics */}
        <QueueStats stats={queueStats} />

        {/* Filters Section */}
        <QueueFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPriority={filterPriority}
          setFilterPriority={setFilterPriority}
          onRefresh={handleRefresh}
        />

        {/* Queue List */}
        <Card className="backdrop-blur-sm border border-gray-200/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                {t("staff.queue.currentQueue")} ({filteredQueue.length}{" "}
                {t("staff.queue.patients")})
              </span>
              <div className="flex items-center gap-2">
                {hasActiveFilters && (
                  <span className="text-sm text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                    {t("staff.queue.filteredView")}
                  </span>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredQueue.length === 0 ? (
              <EmptyQueueState
                hasFilters={hasActiveFilters}
                onClearFilters={clearAllFilters}
                onAddPatient={handleAddPatient}
              />
            ) : (
              <div
                className={`transition-all duration-300 ${
                  viewMode === "table" ? "fade-in" : "fade-in"
                }`}
              >
                {viewMode === "table" ? (
                  <PatientTable
                    patients={filteredQueue}
                    onQueueAction={handleQueueAction}
                    onPositionChange={handlePositionChange}
                    getStatusBadgeVariant={getStatusBadgeVariant}
                    getPriorityBadgeVariant={getPriorityBadgeVariant}
                    getWaitTimeColor={getWaitTimeColor}
                  />
                ) : (
                  <div className="space-y-4">
                    {filteredQueue.map((patient, index) => (
                      <PatientCard
                        key={patient.id}
                        patient={patient}
                        index={index}
                        queueLength={filteredQueue.length}
                        onQueueAction={handleQueueAction}
                        onPositionChange={handlePositionChange}
                        getStatusBadgeVariant={getStatusBadgeVariant}
                        getPriorityBadgeVariant={getPriorityBadgeVariant}
                        getWaitTimeColor={getWaitTimeColor}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
