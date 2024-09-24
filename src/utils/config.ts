import dotenv from "dotenv";
dotenv.config();

const BOT_TOKEN = process.env?.BOT_TOKEN?.replace(/\\\\/g, "\\") || "";
const SAP_BASE_URL = process.env?.SAP_BASE_URL?.replace(/\\\\/g, "\\") || "";
const SAP_LOGIN = process.env?.SAP_LOGIN?.replace(/\\\\/g, "\\") || "";
const SAP_PASSWORD = process.env?.SAP_PASSWORD?.replace(/\\\\/g, "\\") || "";
const SAP_COMPANY_DB = process.env?.SAP_COMPANY_DB?.replace(/\\\\/g, "\\") || "";

export { BOT_TOKEN, SAP_BASE_URL, SAP_LOGIN, SAP_PASSWORD, SAP_COMPANY_DB };
