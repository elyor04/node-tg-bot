import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";
import Invoice from "../types/invoice";
import Period from "../types/period";
import getDates from "./utils/getDates";

const getInvoices = async (
  period: Period
): Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: Invoice[] | null;
      error?: undefined;
    }
> => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  const dates = getDates(period);
  let filter: string;

  if (dates) {
    filter = `(Cancelled eq 'tNO') and (CreationDate ge '${dates.start}') and (CreationDate le '${dates.end}')`;
  } else {
    filter = "Cancelled eq 'tNO'";
  }

  try {
    const data = await axios
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/Invoices`, {
        params: {
          $select: "CardName, DocumentStatus",
          $filter: filter,
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get invoices. ${data.error.message.trim()}`,
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
      error: `Could not get invoices. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default getInvoices;
