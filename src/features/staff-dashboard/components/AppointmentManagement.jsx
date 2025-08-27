import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Edit,
  Phone,
  User,
  RefreshCw,
  CalendarDays,
  Timer,
  AlertCircle,
  MapPin,
  FileText,
  Users,
} from "lucide-react";

export default function AppointmentManagement() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("today");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newAppointmentOpen, setNewAppointmentOpen] = useState(false);

  // Mock appointment data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:30 AM",
      date: "2024-01-15",
      duration: 30,
      type: "Consultation",
      status: "confirmed",
      phone: "+1 (555) 123-4567",
      reason: "Blood pressure follow-up",
      notes: "Patient reports feeling better",
      doctor: "Dr. Ehab",
      room: "Room 1",
      age: 34,
      insurance: "Blue Cross",
    },
    {
      id: 2,
      patient: "Michael Chen",
      time: "10:15 AM",
      date: "2024-01-15",
      duration: 45,
      type: "Follow-up",
      status: "in-progress",
      phone: "+1 (555) 234-5678",
      reason: "Diabetes management",
      notes: "Reviewing recent lab results",
      doctor: "Dr. Ehab",
      room: "Room 2",
      age: 45,
      insurance: "Aetna",
    },
    {
      id: 3,
      patient: "Emma Davis",
      time: "11:00 AM",
      date: "2024-01-15",
      duration: 30,
      type: "Check-up",
      status: "confirmed",
      phone: "+1 (555) 345-6789",
      reason: "Routine annual physical",
      notes: "No current complaints",
      doctor: "Dr. Ehab",
      room: "Room 1",
      age: 28,
      insurance: "United Healthcare",
    },
    {
      id: 4,
      patient: "Robert Wilson",
      time: "02:30 PM",
      date: "2024-01-15",
      duration: 60,
      type: "Surgery Consultation",
      status: "pending",
      phone: "+1 (555) 456-7890",
      reason: "Pre-operative consultation",
      notes: "Hernia repair evaluation",
      doctor: "Dr. Ehab",
      room: "Room 3",
      age: 52,
      insurance: "Medicare",
    },
    {
      id: 5,
      patient: "Lisa Anderson",
      time: "03:15 PM",
      date: "2024-01-15",
      duration: 30,
      type: "Follow-up",
      status: "confirmed",
      phone: "+1 (555) 567-8901",
      reason: "Thyroid function review",
      notes: "Lab results review",
      doctor: "Dr. Ehab",
      room: "Room 2",
      age: 39,
      insurance: "Cigna",
    },
    {
      id: 6,
      patient: "David Brown",
      time: "04:00 PM",
      date: "2024-01-15",
      duration: 30,
      type: "Check-up",
      status: "cancelled",
      phone: "+1 (555) 678-9012",
      reason: "Routine cardiovascular screening",
      notes: "Patient requested cancellation",
      doctor: "Dr. Ehab",
      room: "Room 1",
      age: 48,
      insurance: "Blue Cross",
    },
  ]);

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patient: "",
    phone: "",
    time: "",
    date: "",
    duration: "30",
    type: "Consultation",
    reason: "",
    notes: "",
    room: "Room 1",
  });

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.phone.includes(searchTerm) ||
      appointment.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;

    // Time filter logic
    let matchesTime = true;
    const today = new Date().toISOString().split("T")[0];
    const appointmentDate = appointment.date;

    if (timeFilter === "today") {
      matchesTime = appointmentDate === today;
    } else if (timeFilter === "upcoming") {
      matchesTime = appointmentDate > today;
    } else if (timeFilter === "past") {
      matchesTime = appointmentDate < today;
    }

    return matchesSearch && matchesStatus && matchesTime;
  });

  // Handle appointment actions
  const handleAppointmentAction = (appointmentId, action) => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === appointmentId) {
          switch (action) {
            case "confirm":
              return { ...apt, status: "confirmed" };
            case "cancel":
              return { ...apt, status: "cancelled" };
            case "complete":
              return { ...apt, status: "completed" };
            case "start":
              return { ...apt, status: "in-progress" };
            default:
              return apt;
          }
        }
        return apt;
      })
    );
  };

  // Handle new appointment creation
  const handleCreateAppointment = () => {
    if (
      newAppointment.patient &&
      newAppointment.phone &&
      newAppointment.time &&
      newAppointment.date
    ) {
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        status: "pending",
        doctor: "Dr. Ehab",
        age: 0, // Would be filled from patient database
        insurance: "TBD",
      };
      setAppointments((prev) => [...prev, appointment]);
      setNewAppointment({
        patient: "",
        phone: "",
        time: "",
        date: "",
        duration: "30",
        type: "Consultation",
        reason: "",
        notes: "",
        room: "Room 1",
      });
      setNewAppointmentOpen(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "success";
      case "cancelled":
        return "destructive";
      case "in-progress":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      case "in-progress":
        return <Timer className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const appointmentStats = {
    total: appointments.filter((apt) => apt.date === "2024-01-15").length,
    confirmed: appointments.filter(
      (apt) => apt.status === "confirmed" && apt.date === "2024-01-15"
    ).length,
    pending: appointments.filter(
      (apt) => apt.status === "pending" && apt.date === "2024-01-15"
    ).length,
    completed: appointments.filter(
      (apt) => apt.status === "completed" && apt.date === "2024-01-15"
    ).length,
    cancelled: appointments.filter(
      (apt) => apt.status === "cancelled" && apt.date === "2024-01-15"
    ).length,
    inProgress: appointments.filter(
      (apt) => apt.status === "in-progress" && apt.date === "2024-01-15"
    ).length,
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Appointment Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    Total Today
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {appointmentStats.total}
                  </p>
                </div>
                <CalendarDays className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">
                    Confirmed
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {appointmentStats.confirmed}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {appointmentStats.pending}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-purple-900">
                    {appointmentStats.inProgress}
                  </p>
                </div>
                <Timer className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-700">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-indigo-900">
                    {appointmentStats.completed}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Cancelled</p>
                  <p className="text-2xl font-bold text-red-900">
                    {appointmentStats.cancelled}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              مرشحات المواعيد
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="search"
                  className="text-sm font-medium text-gray-700"
                >
                  بحث في المواعيد
                </Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="ابحث بالمريض أو الهاتف أو السبب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="status-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  تصفية حسب الحالة
                </Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="كل الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كل الحالات</SelectItem>
                    <SelectItem value="confirmed">مؤكد</SelectItem>
                    <SelectItem value="pending">في الانتظار</SelectItem>
                    <SelectItem value="in-progress">قيد التنفيذ</SelectItem>
                    <SelectItem value="completed">مكتمل</SelectItem>
                    <SelectItem value="cancelled">ملغى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="time-filter"
                  className="text-sm font-medium text-gray-700"
                >
                  تصفية حسب الوقت
                </Label>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="نطاق الوقت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">كل الأوقات</SelectItem>
                    <SelectItem value="today">اليوم</SelectItem>
                    <SelectItem value="upcoming">القادمة</SelectItem>
                    <SelectItem value="past">السابقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>المواعيد ({filteredAppointments.length})</span>
              <Button size="sm" variant="outline" className="gap-2">
                <CalendarDays className="w-4 h-4" />
                عرض التقويم
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  لا توجد مواعيد
                </h3>
                <p className="text-gray-500">
                  {searchTerm ||
                  statusFilter !== "all" ||
                  timeFilter !== "today"
                    ? "No appointments match your current filters."
                    : "No appointments scheduled for today."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow
                        key={appointment.id}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {appointment.patient}
                              </p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Phone className="w-3 h-3" />
                                <span>{appointment.phone}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="font-medium">{appointment.time}</p>
                              <p className="text-sm text-gray-500">
                                {appointment.duration} min
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{appointment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.reason}
                            </p>
                            {appointment.notes && (
                              <p className="text-sm text-gray-500 truncate max-w-xs">
                                {appointment.notes}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={getStatusBadgeVariant(appointment.status)}
                            className="gap-1"
                          >
                            {getStatusIcon(appointment.status)}
                            {appointment.status.replace("-", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{appointment.room}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {appointment.status === "pending" && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleAppointmentAction(
                                          appointment.id,
                                          "confirm"
                                        )
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Confirm appointment</p>
                                  </TooltipContent>
                                </Tooltip>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="destructive">
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Cancel Appointment
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to cancel the
                                        appointment for {appointment.patient}?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Keep Appointment
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() =>
                                          handleAppointmentAction(
                                            appointment.id,
                                            "cancel"
                                          )
                                        }
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Cancel Appointment
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}

                            {appointment.status === "confirmed" && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleAppointmentAction(
                                          appointment.id,
                                          "start"
                                        )
                                      }
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      <Timer className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Start appointment</p>
                                  </TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit appointment</p>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}

                            {appointment.status === "in-progress" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleAppointmentAction(
                                        appointment.id,
                                        "complete"
                                      )
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Complete appointment</p>
                                </TooltipContent>
                              </Tooltip>
                            )}

                            {(appointment.status === "completed" ||
                              appointment.status === "cancelled") && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <FileText className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View details</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
