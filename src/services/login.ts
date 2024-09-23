import axios from "axios";
import {
  SAP_BASE_URL,
  SAP_LOGIN,
  SAP_PASSWORD,
  SAP_COMPANY_DB,
} from "../utils/config";

let cookies: string, expiresAt: number;

const loginToSAP = async () => {
  if (!cookies || Date.now() > expiresAt) {
    try {
      const res = await axios.post(
        `${SAP_BASE_URL}/ServiceLayer/b1s/v2/Login`,
        {
          UserName: SAP_LOGIN,
          Password: SAP_PASSWORD,
          CompanyDB: SAP_COMPANY_DB,
        }
      );

      if (res?.data?.error?.message)
        return {
          error: `Could not login to SAP. ${res.data.error.message}`,
        };

      const setCookies = res.headers["set-cookie"]?.join(";");

      const B1SESSION = setCookies?.match(/B1SESSION=([^;]+)/);
      const ROUTEID = setCookies?.match(/ROUTEID=([^;]+)/);

      // @ts-ignore
      cookies = `B1SESSION=${B1SESSION[1]}; ROUTEID=${ROUTEID[1]}`;
      expiresAt = Date.now() + res.data.SessionTimeout * 60 * 1000;

    } catch (err) {
      return {
        // @ts-ignore
        error: `Could not login to SAP. ${err?.name} - ${err?.message}`,
      };
    }
  }

  return { cookies };
};

export default loginToSAP;
