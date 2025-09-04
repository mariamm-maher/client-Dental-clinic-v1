// Format time for display (12-hour format with Arabic AM/PM)
export const formatTimeDisplay = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const period = hour < 12 ? "ص" : "م";
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

// Generate time options (24-hour format)
export const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const displayTime = formatTimeDisplay(timeString);
      times.push({ value: timeString, label: displayTime });
    }
  }
  return times;
};

// Days of the week configuration
export const daysOfWeek = [
  { key: "sunday", label: "الأحد", shortLabel: "أحد" },
  { key: "monday", label: "الاثنين", shortLabel: "اثنين" },
  { key: "tuesday", label: "الثلاثاء", shortLabel: "ثلاثاء" },
  { key: "wednesday", label: "الأربعاء", shortLabel: "أربعاء" },
  { key: "thursday", label: "الخميس", shortLabel: "خميس" },
  { key: "friday", label: "الجمعة", shortLabel: "جمعة" },
  { key: "saturday", label: "السبت", shortLabel: "سبت" },
];
