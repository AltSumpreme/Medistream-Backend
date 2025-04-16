import { Logging } from "@google-cloud/logging";

const logging = new Logging();
const log = logging.log("hono-api-log");

const metadata = {
  resource: { type: "global" },
};

export interface LogData {
  message: string;
  severity?:
    | "DEFAULT"
    | "DEBUG"
    | "INFO"
    | "NOTICE"
    | "WARNING"
    | "ERROR"
    | "CRITICAL"
    | "ALERT"
    | "EMERGENCY";
  method?: string;
  path?: string;
  origin?: string | null;
  headers?: Record<string, string>;
  [key: string]: unknown;
}
export const logRequest = async (data: LogData): Promise<void> => {
  const entry = log.entry(metadata, data);
  await log.write(entry);
};
