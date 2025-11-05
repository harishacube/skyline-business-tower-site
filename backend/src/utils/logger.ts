import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

export interface LogConfig {
  file: {
    level: string;
    filename: string;
    zippedArchive: boolean;
    maxSize: string;
    maxFiles: string;
    datePattern: string;
  };
  console: {
    level: string;
    handleExceptions: boolean;
    json: boolean;
    colorize: boolean;
  };
  directory: string;
}

export const logConfig: LogConfig = {
  file: {
    level: "error",
    filename: `./logs/${process.env.LOG_FILE_NAME}`,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "100m",
    maxFiles: "14d",
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
  directory: __dirname,
};

const logger = createLogger({
  transports: [
    new transports.DailyRotateFile(logConfig.file),
    new transports.Console(logConfig.console),
  ],
  format: format.combine(
    format.label({
      label: "API",
    }),
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.prettyPrint(),
    format.printf(
      (info) =>
        `${info.level}: ${[info.timestamp]}: ${info.message} ${info.stack ? ":" + info.stack : ""}`,
    ),
  ),
  exitOnError: false,
});

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};
export { logger, stream };
