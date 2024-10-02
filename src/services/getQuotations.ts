import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";

const getQuotations = async (top: number = 0, skip: number = 0) => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  try {
    const data = await axios
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/Quotations`, {
        params: {
          $top: top,
          $skip: skip,
          $select: "CardName, DocumentStatus",
          $filter: "Cancelled eq 'tNO'",
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get quotations. ${data.error.message.trim()}`,
      };

    if (data?.value?.length)
      return {
        data: data.value.map((item: any) => {
          return {
            cardName: item.CardName,
            docStatus: item.DocumentStatus,
          };
        }),
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not get quotations. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default getQuotations;
