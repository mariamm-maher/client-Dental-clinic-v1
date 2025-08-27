import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  Store,
  Briefcase,
  BarChart3,
  Users,
  Heart,
} from "lucide-react";

/**
 * Reusable Logo/Brand Component
 * Can be customized for different applications
 */
export function BrandLogo({
  name,
  initials,
  specialty,
  specialtyIcon = null,
  size = "default",
  showSpecialty = true,
  showSpecialtyIcon = true,
  className = "",
  avatarClassName = "bg-blue-100 text-blue-600",
  badgeClassName = "bg-gray-100 text-gray-700",
}) {
  const sizes = {
    small: {
      avatar: "w-8 h-8",
      title: "text-base font-bold",
      badge: "text-xs",
      icon: "w-3 h-3",
    },
    default: {
      avatar: "w-12 h-12",
      title: "text-xl font-bold",
      badge: "text-xs",
      icon: "w-4 h-4",
    },
    large: {
      avatar: "w-16 h-16",
      title: "text-2xl font-bold",
      badge: "text-sm",
      icon: "w-5 h-5",
    },
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Avatar className={currentSize.avatar}>
        <AvatarFallback className={`${avatarClassName} font-semibold`}>
          {initials}
        </AvatarFallback>
      </Avatar>

      <div>
        <h1 className={`${currentSize.title} text-gray-900`}>{name}</h1>{" "}
        {showSpecialty && specialty && (
          <div className="flex items-center space-x-2">
            <Badge className={`${currentSize.badge} ${badgeClassName} border`}>
              {showSpecialtyIcon && specialtyIcon && (
                <span className={`${currentSize.icon} mr-1`}>
                  {specialtyIcon}
                </span>
              )}
              {specialty}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Reusable Stats/Metrics Cards Grid
 * Perfect for dashboards showing KPIs
 */
export function StatsGrid({ stats = [], columns = 4, loading = false }) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {Array.from({ length: columns }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            {stat.icon && (
              <div className={`h-4 w-4 ${stat.iconColor || "text-gray-400"}`}>
                {stat.icon}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                stat.valueColor || "text-gray-900"
              }`}
            >
              {stat.value}
            </div>
            {stat.change && (
              <p className="text-xs text-gray-600 flex items-center mt-1">
                {stat.change.type === "increase" && (
                  <span className="text-green-600 mr-1">↗</span>
                )}
                {stat.change.type === "decrease" && (
                  <span className="text-red-600 mr-1">↘</span>
                )}
                <span
                  className={
                    stat.change.type === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {stat.change.value}
                </span>
                <span className="ml-1">{stat.change.label}</span>
              </p>
            )}
            {stat.description && (
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Reusable Activity Feed Component
 */
export function ActivityFeed({
  activities = [],
  title = "Recent Activity",
  maxItems = 5,
}) {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === "success"
                  ? "bg-green-100"
                  : activity.type === "warning"
                  ? "bg-yellow-100"
                  : activity.type === "error"
                  ? "bg-red-100"
                  : "bg-blue-100"
              }`}
            >
              {activity.icon || (
                <svg
                  className={`h-4 w-4 ${
                    activity.type === "success"
                      ? "text-green-600"
                      : activity.type === "warning"
                      ? "text-yellow-600"
                      : activity.type === "error"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">{activity.text}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

/**
 * Reusable Data List Component
 */
export function DataList({
  items = [],
  showActions = false,
  onItemClick = null,
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${
            onItemClick ? "cursor-pointer hover:bg-gray-100" : ""
          }`}
          onClick={() => onItemClick && onItemClick(item)}
        >
          <div className="flex-1">
            <p className="font-medium text-gray-900">{item.primary}</p>
            {item.secondary && (
              <p className="text-sm text-gray-600">{item.secondary}</p>
            )}
            {item.tertiary && (
              <p className="text-xs text-gray-500">{item.tertiary}</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {item.badge && (
              <Badge
                className={item.badge.color || "bg-gray-100 text-gray-700"}
              >
                {item.badge.text}
              </Badge>
            )}

            {item.status && (
              <div
                className={`w-3 h-3 rounded-full ${
                  item.status === "active"
                    ? "bg-green-500"
                    : item.status === "pending"
                    ? "bg-yellow-500"
                    : item.status === "inactive"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              />
            )}

            {showActions && item.actions && (
              <div className="flex space-x-1">
                {item.actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick(item);
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
