import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  User,
  Clock,
  Phone,
  MapPin,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PatientTable({
  patients,
  onQueueAction,
  onPositionChange,
  getStatusBadgeVariant,
  getPriorityBadgeVariant,
  getWaitTimeColor,
}) {
  const { t } = useTranslation();
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>{t("staff.table.patient")}</TableHead>
            <TableHead>{t("staff.table.times")}</TableHead>
            <TableHead>{t("staff.table.status")}</TableHead>
            <TableHead>{t("staff.table.priority")}</TableHead>
            <TableHead>{t("staff.table.waitTime")}</TableHead>
            <TableHead>{t("staff.table.room")}</TableHead>
            <TableHead>{t("staff.table.reason")}</TableHead>
            <TableHead className="text-right">
              {t("staff.table.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow
              key={patient.id}
              className={`hover:bg-gray-50 transition-colors ${
                patient.priority === "urgent"
                  ? "bg-red-50/30"
                  : patient.status === "in-progress"
                  ? "bg-green-50/30"
                  : ""
              }`}
            >
              {/* Position */}
              <TableCell>
                <div className="flex flex-col items-center space-y-1">
                  <Badge variant="outline" className="font-bold">
                    {patient.position}
                  </Badge>
                  <div className="flex flex-col">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onPositionChange(patient.id, "up")}
                      disabled={index === 0}
                      className="h-5 w-6 p-0"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onPositionChange(patient.id, "down")}
                      disabled={index === patients.length - 1}
                      className="h-5 w-6 p-0"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </TableCell>

              {/* Patient Info */}
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      {getInitials(patient.patient)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {patient.patient}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Phone className="w-3 h-3" />
                      <span>{patient.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Times */}
              <TableCell>
                <div className="text-sm">
                  <div className="flex items-center space-x-1 mb-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="font-medium">
                      {patient.appointmentTime}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {t("staff.patient.checkIn")} {patient.checkInTime}
                  </div>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  variant={getStatusBadgeVariant(patient.status)}
                  className="gap-1"
                >
                  {patient.status === "in-progress" && (
                    <Play className="w-3 h-3" />
                  )}
                  {patient.status === "on-hold" && (
                    <Pause className="w-3 h-3" />
                  )}
                  {patient.status === "waiting" && (
                    <Clock className="w-3 h-3" />
                  )}
                  {t(`staff.status.${patient.status.replace("-", "")}`)}
                </Badge>
              </TableCell>

              {/* Priority */}
              <TableCell>
                <Badge
                  variant={getPriorityBadgeVariant(patient.priority)}
                  className="gap-1"
                >
                  {patient.priority === "urgent" && (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {t(`staff.priority.${patient.priority}`)}
                </Badge>
              </TableCell>

              {/* Wait Time */}
              <TableCell>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      getWaitTimeColor(patient.waitTime) === "text-red-600"
                        ? "bg-red-500"
                        : getWaitTimeColor(patient.waitTime) ===
                          "text-amber-600"
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div className="text-sm">
                    <p
                      className={`font-medium ${getWaitTimeColor(
                        patient.waitTime
                      )}`}
                    >
                      {patient.waitTime}
                      {t("staff.patient.minutesShort")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {patient.estimatedWait}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Room */}
              <TableCell>
                <div className="flex items-center space-x-1 text-sm">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span>{patient.roomPreference}</span>
                </div>
              </TableCell>

              {/* Reason */}
              <TableCell>
                <div className="max-w-xs">
                  <p className="font-medium text-sm truncate">
                    {patient.reason}
                  </p>
                  {patient.notes && (
                    <p className="text-xs text-gray-500 truncate">
                      {patient.notes}
                    </p>
                  )}
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  {patient.status === "waiting" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => onQueueAction(patient.id, "call-next")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {t("staff.actions.callPatient")}
                      </TooltipContent>
                    </Tooltip>
                  )}

                  {patient.status === "in-progress" && (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onQueueAction(patient.id, "hold")}
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {t("staff.actions.putOnHold")}
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() =>
                              onQueueAction(patient.id, "complete")
                            }
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {t("staff.actions.completeAppointment")}
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}

                  {patient.status === "on-hold" && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => onQueueAction(patient.id, "call-next")}
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {t("staff.actions.resumeAppointment")}
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
  );
}
