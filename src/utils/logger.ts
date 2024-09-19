const log = (level: string, message: string) => {
  const timestamp: string = new Date().toLocaleString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
};

// Logging methods
const logger = {
  info: (message: string) => log("info", message),
  warn: (message: string) => log("warn", message),
  error: (message: string) => log("error", message),
  debug: (message: string) => log("debug", message),
};

export default logger;
