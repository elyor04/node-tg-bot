import formatDate from "./formatDate";

const log = (level: string, message: string) => {
  const timestamp: string = formatDate(new Date());
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};

// Logging methods
const logger = {
  info: (message: string) => log("info", message),
  warn: (message: string) => log("warn", message),
  error: (message: string) => log("error", message),
  debug: (message: string) => log("debug", message),
};

export default logger;
