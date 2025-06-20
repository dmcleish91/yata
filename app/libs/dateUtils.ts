// Formats a date string (YYYY-MM-DD) to MM/DD/YYYY
export function formatDateToDisplay(date: string | null | undefined): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${month}/${day}/${year}`;
}

// Formats a time string (HH:mm) to XX:XX AM/PM
export function formatTimeToAMPM(time: string | null | undefined): string {
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
export function getTodaysDateYYYYMMDD(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Returns current time in HH:mm format
export function getCurrentTimeHHMM(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Formats a date string (Date or string) to YYYY-MM-DD (PostgreSQL and HTML input compatible)
export function formatDateToISODate(
  date: string | Date | null | undefined,
): string {
  if (!date) return "";
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Formats a time string (Date or string) to HH:MM:SS (PostgreSQL compatible)
export function formatTimeToISOTime(time: string | null | undefined): string {
  // An early return for invalid inputs improves readability.
  if (!time) {
    return "";
  }

  // Expects the input string to be in "HH:mm" format.
  const parts = time.split(":");
  if (parts.length === 2) {
    const [hours, minutes] = parts;
    // Pad with leading zeros and append seconds for ISO 8601 compatibility.
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  }

  // Return an empty string if the format is incorrect.
  return "";
}

// Formats a time string (Date or string) to HH:MM (HTML input compatible)
export function formatTimeToInput(
  time: string | Date | null | undefined,
): string {
  if (!time) return "";
  if (typeof time === "string" && /^\d{2}:\d{2}$/.test(time)) return time;
  let d: Date;
  if (typeof time === "string") {
    // Accepts HH:MM:SS
    const parts = time.split(":");
    if (parts.length === 3) {
      return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
    } else if (parts.length === 2) {
      return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
    }
    d = new Date(`1970-01-01T${time}`);
  } else {
    d = time;
  }
  if (isNaN(d.getTime())) return "";
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

// Combines today's date with a given time string to create an ISO datetime string
export function combineTodayWithTime(timeString: string): string {
  const today = getTodaysDateYYYYMMDD();
  const isoTime = formatTimeToISOTime(timeString);
  if (!isoTime) {
    return ""; // Return empty if timeString cannot be formatted
  }
  // Return as a UTC string by appending 'Z'
  return `${today}T${isoTime}Z`;
}

export function extractDateFromISO(isoString: string): string {
  if (!isoString) return "";
  return isoString.split("T")[0];
}

export function extractTimeFromISO(isoString: string): string {
  if (!isoString) return "";
  const timePart = isoString.split("T")[1];
  if (!timePart) return "";
  console.log(timePart);
  return timePart.slice(0, 5);
}
