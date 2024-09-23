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
        error: `Could not logout from SAP. ${res.data.error.message}`,
      };

  } catch (err) {
    return {
      // @ts-ignore
      error: `Could not logout from SAP. ${err?.name} - ${err?.message}`,
    };
  }

  return {};
};

export default logoutFromSAP;
