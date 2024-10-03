import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";
import BusinessPartner from "../types/businessPartner";

const getBusinessPartner = async (
  cardCode: string
): Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: BusinessPartner;
      error?: undefined;
    }
> => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  try {
    const data = await axios
      .get(
        `${SAP_BASE_URL}/ServiceLayer/b1s/v2/BusinessPartners('${cardCode}')`,
        {
          params: {
            $select: "CurrentAccountBalance",
          },
          headers: {
            Cookie: loginResult.cookies,
          },
        }
      )
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get business partner. ${data.error.message.trim()}`,
      };

    return {
      data: {
        currentAccountBalance: data.CurrentAccountBalance,
      },
    };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not get business partner. ${errorMessage.trim()}`,
    };
  }
};

export default getBusinessPartner;
