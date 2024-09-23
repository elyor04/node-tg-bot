import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";

const logoutFromSAP = async (cookies: string) => {
  try {
    const res = await axios.post(
      `${SAP_BASE_URL}/ServiceLayer/b1s/v2/Logout`,
      {},
      {
        headers: { Cookie: cookies },
      }
    );

    if (res?.data?.error?.message)
      return {
        error: `Could not logout from SAP. ${res.data.error.message.trim()}`,
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not login to SAP. ${errorMessage.trim()}`,
    };
  }

  return {};
};

export default logoutFromSAP;
