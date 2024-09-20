import formatDate from "./formatDate";

const log = (level: string, message: string) => {
  const timestamp: string = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
  console.log(`[${timestamp}] [${level}] ${message}`);
};

// Logging methods
const logger = {
  info: (message: string) => log("INFO", message),
  warn: (message: string) => log("WARN", message),
  error: (message: string) => log("ERROR", message),
  debug: (message: string) => log("DEBUG", message),
};

export default logger;
