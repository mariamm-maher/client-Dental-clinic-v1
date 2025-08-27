import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Stethoscope, AlertTriangle } from "lucide-react";
import { clinicConfig } from "@/lib/config";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Medical Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-8 h-8 animate-pulse">
          <div className="absolute inset-0 bg-blue-600/30 transform rotate-45"></div>
          <div className="absolute inset-0 bg-blue-600/30"></div>
        </div>
        <div className="absolute top-40 right-32 w-6 h-6 animate-pulse delay-300">
          <div className="absolute inset-0 bg-purple-600/20 transform rotate-45"></div>
          <div className="absolute inset-0 bg-purple-600/20"></div>
        </div>
        <div className="absolute bottom-32 left-32 w-10 h-10 animate-pulse delay-700">
          <div className="absolute inset-0 bg-indigo-600/25 transform rotate-45"></div>
          <div className="absolute inset-0 bg-indigo-600/25"></div>
        </div>
      </div>

      <div className="text-center max-w-2xl mx-auto relative z-10">
        {/* Animated Medical Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-2xl">
              <Stethoscope className="w-16 h-16 text-blue-600 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 mb-4 animate-pulse">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("notFound.title")}
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {t("notFound.message")}
            <br />
            {t("notFound.backTo")}{" "}
            <span className="font-semibold text-blue-600">
              {clinicConfig.name}
            </span>
            .
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700"
          >
            <Home className="w-5 h-5 mr-3" />
            {t("notFound.backHome")}
          </Link>{" "}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200 hover:border-gray-300"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            {t("notFound.goBack")}
          </button>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            {t("notFound.needHelp")}{" "}
            <a
              href={`tel:${clinicConfig.contact.phone}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {clinicConfig.contact.phone}
            </a>{" "}
            {t("notFound.or")}{" "}
            <a
              href={`mailto:${clinicConfig.contact.email}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {clinicConfig.contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
