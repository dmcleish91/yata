// Logger utility for development mode with colorized output
function isDevelopment(): boolean {
  return (
    import.meta.env.MODE === "development" ||
    process.env.NODE_ENV === "development"
  );
}

export function logInfo(message: string, ...optionalParams: unknown[]): void {
  if (!isDevelopment()) return;
  console.log(
    "%c[INFO]%c " + message,
    "color: blue; font-weight: bold;",
    "color: inherit;",
    ...optionalParams,
  );
}

export function logWarn(message: string, ...optionalParams: unknown[]): void {
  if (!isDevelopment()) return;
  console.warn(
    "%c[WARN]%c " + message,
    "color: orange; font-weight: bold;",
    "color: inherit;",
    ...optionalParams,
  );
}

export function logError(message: string, ...optionalParams: unknown[]): void {
  if (!isDevelopment()) return;
  console.error(
    "%c[ERROR]%c " + message,
    "color: red; font-weight: bold;",
    "color: inherit;",
    ...optionalParams,
  );
}
