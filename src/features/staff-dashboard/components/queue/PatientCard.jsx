import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export default function PatientCard({
  patient,
  index,
  queueLength,
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
    <Card
      className={`transition-all duration-300 hover:shadow-lg border-l-4 ${
        patient.priority === "urgent"
          ? "border-l-red-500 bg-red-50/30"
          : patient.status === "in-progress"
          ? "border-l-green-500 bg-green-50/30"
          : "border-l-blue-500 bg-blue-50/30"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Patient Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {getInitials(patient.patient)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {patient.patient}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>
                    {t("staff.patient.age")} {patient.age}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Position and Priority */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-lg font-bold px-3 py-1">
              #{patient.position}
            </Badge>
            <Badge variant={getPriorityBadgeVariant(patient.priority)}>
              {patient.priority === "urgent" && (
                <AlertTriangle className="w-3 h-3 mr-1" />
              )}
              {t(`staff.priority.${patient.priority}`)}
            </Badge>
          </div>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="font-medium">
                {t("staff.patient.appointment")} {patient.appointmentTime}
              </p>
              <p className="text-gray-600">
                {t("staff.patient.checkIn")} {patient.checkInTime}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <p className="font-medium">{patient.roomPreference}</p>
              <p className="text-gray-600">{t("staff.patient.preferred")}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <div
              className={`w-4 h-4 rounded-full ${
                getWaitTimeColor(patient.waitTime) === "text-red-600"
                  ? "bg-red-500"
                  : getWaitTimeColor(patient.waitTime) === "text-amber-600"
                  ? "bg-amber-500"
                  : "bg-green-500"
              }`}
            />
            <div>
              <p
                className={`font-medium ${getWaitTimeColor(patient.waitTime)}`}
              >
                {t("staff.patient.wait")}: {patient.waitTime}
                {t("staff.patient.minutesShort")}
              </p>
              <p className="text-gray-600">{patient.estimatedWait}</p>
            </div>
          </div>
        </div>

        {/* Reason and Notes */}
        <div className="mb-4">
          <p className="font-medium text-gray-900 mb-1">{patient.reason}</p>
          {patient.notes && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
              {patient.notes}
            </p>
          )}
        </div>

        {/* Status and Actions */}
        <div className="flex items-center justify-between">
          <Badge
            variant={getStatusBadgeVariant(patient.status)}
            className="gap-1"
          >
            {patient.status === "in-progress" && <Play className="w-3 h-3" />}
            {patient.status === "on-hold" && <Pause className="w-3 h-3" />}
            {patient.status === "waiting" && <Clock className="w-3 h-3" />}
            {t(`staff.status.${patient.status.replace("-", "")}`)}
          </Badge>

          <div className="flex items-center space-x-2">
            {/* Position Controls */}
            <div className="flex flex-col">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPositionChange(patient.id, "up")}
                    disabled={index === 0}
                    className="h-6 w-8 p-0"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("staff.actions.moveUp")}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPositionChange(patient.id, "down")}
                    disabled={index === queueLength - 1}
                    className="h-6 w-8 p-0"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("staff.actions.moveDown")}</TooltipContent>
              </Tooltip>
            </div>

            {/* Action Buttons */}
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
                      onClick={() => onQueueAction(patient.id, "complete")}
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
        </div>
      </CardContent>
    </Card>
  );
}
