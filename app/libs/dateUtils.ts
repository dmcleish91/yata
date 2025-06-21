/**
 * Formats a date string from YYYY-MM-DD to MM/DD/YYYY.
 * @param date The date string in YYYY-MM-DD format.
 * @returns The formatted date string "MM/DD/YYYY", or an empty string if the input is invalid.
 */
// Formats a date string (YYYY-MM-DD) to MM/DD/YYYY
export function formatDateToDisplay(date: string | null | undefined): string {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${month}/${day}/${year}`;
}

/**
 * Formats a time string from HH:mm to a 12-hour format with AM/PM.
 * @param time The time string in HH:mm format.
 * @returns The formatted time string "h:mm AM/PM", or an empty string if the input is invalid.
 */
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

/**
 * Gets the current date in YYYY-MM-DD format.
 * @returns The current date as a string.
 */
// Returns current date in YYYY-MM-DD format
export function getTodaysDateYYYYMMDD(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Gets the current time in HH:mm format.
 * @returns The current time as a string.
 */
// Returns current time in HH:mm format
export function getCurrentTimeHHMM(): string {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Formats a Date object or a date string into YYYY-MM-DD format.
 * This is compatible with PostgreSQL date type and HTML date inputs.
 * @param date The date to format, can be a Date object, a string, null, or undefined.
 * @returns The formatted date string, or an empty string if the input is invalid.
 */
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

/**
 * Formats a time string from HH:mm to HH:MM:SS for PostgreSQL compatibility.
 * @param time The time string in HH:mm format.
 * @returns The formatted time string "HH:MM:SS", or an empty string if the input is invalid.
 */
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

/**
 * Formats a time value into HH:MM format for HTML time inputs.
 * Accepts various time string formats (HH:mm, HH:mm:ss) or a Date object.
 * @param time The time value to format.
 * @returns The formatted time string "HH:MM", or an empty string if the input is invalid.
 */
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

/**
 * Combines today's date with a given time to create a UTC ISO 8601 datetime string.
 * @param timeString The time in HH:mm format.
 * @returns A full ISO 8601 datetime string in UTC (e.g., "YYYY-MM-DDTHH:MM:SSZ").
 */
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

/**
 * Extracts the date portion (YYYY-MM-DD) from an ISO 8601 datetime string.
 * @param isoString The ISO 8601 datetime string.
 * @returns The date part of the string.
 */
export function extractDateFromISO(isoString: string): string {
  if (!isoString) return "";
  return isoString.split("T")[0];
}

/**
 * Extracts the time portion (HH:mm) from an ISO 8601 datetime string.
 * @param isoString The ISO 8601 datetime string.
 * @returns The time part of the string.
 */
export function extractTimeFromISO(isoString: string): string {
  if (!isoString) return "";
  const timePart = isoString.split("T")[1];
  if (!timePart) return "";
  console.log(timePart);
  return timePart.slice(0, 5);
}

/**
 * Formats an ISO 8601 date (and optional time) into a user-friendly, readable format.
 * - Displays day of the week if the date is within the next 7 days.
 * - Shows month and day for dates in the current year.
 * - Includes the year for dates in other years.
 * - Appends time in a clean format if provided.
 * @param dueDate The due date in YYYY-MM-DD format.
 * @param dueDateTime Optional time in HH:mm or HH:mm:ss format.
 * @returns A formatted, human-readable date/time string.
 */
// Formats ISO 8601 date and time for display with smart formatting
export function formatISO8601(
  dueDate: string,
  dueDateTime?: string | null,
): string {
  if (!dueDate) return "";

  const today = new Date();
  const dueDateObj = new Date(dueDate);

  if (isNaN(dueDateObj.getTime())) return "";

  // Calculate days difference
  const timeDiff = dueDateObj.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  let dateString = "";

  if (daysDiff < 7 && daysDiff >= 0) {
    // Less than a week away - show day of week
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    dateString = daysOfWeek[dueDateObj.getDay()];
  } else {
    // More than a week away or past date
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[dueDateObj.getMonth()];
    const day = dueDateObj.getDate();

    if (dueDateObj.getFullYear() > today.getFullYear()) {
      // Different year - include year
      dateString = `${month} ${day} ${dueDateObj.getFullYear()}`;
    } else {
      // Same year - just month and day
      dateString = `${month} ${day}`;
    }
  }

  // Add time if provided
  if (dueDateTime) {
    let timeString = "";
    let timeToFormat = dueDateTime;

    if (dueDateTime.includes("T")) {
      timeToFormat = extractTimeFromISO(dueDateTime);
    }

    // Check if time ends in ":00"
    if (timeToFormat.endsWith(":00")) {
      const [hourStr] = timeToFormat.split(":");
      const hour = parseInt(hourStr, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      timeString = `${displayHour} ${ampm}`;
    } else {
      // Use existing formatTimeToAMPM for other times
      timeString = formatTimeToAMPM(timeToFormat);
    }

    if (timeString) {
      dateString += ` ${timeString}`;
    }
  }

  return dateString;
}
