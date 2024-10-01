import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";

const postQuotation = async () => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  try {
    const data = await axios
      .post(
        `${SAP_BASE_URL}/ServiceLayer/b1s/v2/Quotations`,
        {},
        {
          headers: {
            Cookie: loginResult.cookies,
          },
        }
      )
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not post quotation. ${data.error.message.trim()}`,
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not get items. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default postQuotation;
