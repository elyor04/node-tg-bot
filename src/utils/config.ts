import dotenv from "dotenv";
dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const SAP_BASE_URL = process.env.SAP_BASE_URL || "";
const SAP_LOGIN = process.env.SAP_LOGIN || "";
const SAP_PASSWORD = process.env.SAP_PASSWORD || "";
const SAP_COMPANY_DB = process.env.SAP_COMPANY_DB || "";

export { BOT_TOKEN, SAP_BASE_URL, SAP_LOGIN, SAP_PASSWORD, SAP_COMPANY_DB };
