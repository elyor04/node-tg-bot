import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";
import Period from "../types/period";
import getDates from "./utils/getDates";

const getIncomingPayments = async (cardCode: string, period: Period) => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  const dates = getDates(period);
  let filter: string;

  if (dates) {
    filter = `(Cancelled eq 'tNO') and (CardCode eq '${cardCode}') and (DocDate ge '${dates.start}') and (DocDate le '${dates.end}')`;
  } else {
    filter = `(Cancelled eq 'tNO') and (CardCode eq '${cardCode}')`;
  }

  try {
    const data = await axios
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/IncomingPayments`, {
        params: {
          $select: "DocDate, CashSum",
          $filter: filter,
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get incoming payments. ${data.error.message.trim()}`,
      };

    if (data?.value?.length)
      return {
        data: data.value.map((item: any) => {
          return {
            DocDate: new Date(item.DocDate),
            CashSum: item.CashSum,
          };
        }),
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not get incoming payments. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default getIncomingPayments;
