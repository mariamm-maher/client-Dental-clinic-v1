import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UserPlus,
  Phone,
  User,
  Check,
  AlertCircle,
  Search,
} from "lucide-react";
import usePatientStore from "@/stores/patientStore";
import { searchPatients } from "@/features/staff-dashboard/services/staffServices";
import { useState, useEffect } from "react";

export default function PatientForm() {
  const { formData, isSubmitting, setFormData, submitPatient } =
    usePatientStore();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.generalInfo.name.length >= 2) {
        handleSearch(formData.generalInfo.name);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [formData.generalInfo.name]);
  const handleSearch = async (searchTerm) => {
    if (searchTerm.length < 2) return;

    setIsSearching(true);
    try {
      const result = await searchPatients(searchTerm);
      if (result.success && result.data && result.data.length > 0) {
        setSearchResults(result.data);
        setShowSearchResults(true);
      } else {
        // No patients found or unsuccessful search
        setSearchResults([]);
        setShowSearchResults(false);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      setShowSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPatient = (patient) => {
    // Fill the form with selected patient data
    setFormData("name", patient.generalInfo.name);
    setFormData("phone", patient.generalInfo.phone);

    // Hide search results
    setShowSearchResults(false);
    setSearchResults([]);
  };

  console.log("Search Results:", searchResults);

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicking on results
    setTimeout(() => setShowSearchResults(false), 200);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitPatient();
    if (success) {
      // Form is automatically reset in the store after successful submission
      console.log("Patient registered successfully and form reset");
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl text-gray-900">
          <div className="p-2 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl text-gray-900">تسجيل مريض جديد</h2>
            <p className="text-sm text-gray-600 font-normal">
              املأ المعلومات الأساسية للمريض
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {" "}
          {/* Patient Name */}
          <div className="space-y-2 relative">
            <Label
              htmlFor="name"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <User className="w-4 h-4 text-sky-600" />
              الاسم الكامل للمريض
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                autoComplete="off"
                placeholder="أدخل الاسم الكامل للمريض"
                value={formData.generalInfo.name}
                onChange={(e) => setFormData("name", e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="h-12 text-right bg-white/80 border-gray-200 focus:border-sky-500 focus:ring-sky-500 pl-10"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                {isSearching ? (
                  <div className="w-4 h-4 border-2 border-sky-300 border-t-sky-600 rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {searchResults.map((patient) => (
                  <div
                    key={patient._id}
                    onClick={() => handleSelectPatient(patient)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          {patient.generalInfo.name}
                        </p>
                        <p className="text-xs text-gray-500">مريض موجود</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Phone Number */}
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="flex items-center gap-2 text-sm font-medium text-gray-700"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              رقم الهاتف
            </Label>{" "}
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={formData.generalInfo.phone}
              onChange={(e) => setFormData("phone", e.target.value)}
              className="h-12 text-right bg-white/80 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>جاري التسجيل...</span>
              </div>
            ) : (
              <>
                <Check className="w-5 h-5" />
                <span>تسجيل المريض</span>
              </>
            )}
          </Button>
        </form>

        {/* Info Note */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-200 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">تسجيل سريع</p>
              <p>هذا النموذج يسجل المرضى بمعلومات الاتصال الأساسية فقط.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
