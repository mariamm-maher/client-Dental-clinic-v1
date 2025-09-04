import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorDisplay = ({ error, onClearError }) => {
  if (!error) return null;

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearError}
            className="ml-auto text-red-600 hover:text-red-700"
          >
            إغلاق
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
