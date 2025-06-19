// Formats a date string (YYYY-MM-DD) to MM/DD/YYYY
export function formatDateToMMDDYYYY(date: string): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${month}/${day}/${year}`;
}

// Formats a time string (HH:mm) to XX:XX AM/PM
export function formatTimeTo12Hour(time: string): string {
  if (!time) return "";
  const [hourStr, minute] = time.split(":");
  if (!hourStr || !minute) return time;
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

// Returns current date in YYYY-MM-DD format
export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Returns current time in HH:mm format
export function getCurrentTime(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
