import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";
import DeliveryNote from "../types/deliveryNote";

const getDeliveryNotes = async (
  top: number = 100,
  skip: number = 0
): Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: DeliveryNote[] | null;
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
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/DeliveryNotes`, {
        params: {
          $top: top,
          $skip: skip,
          $select: "CardCode, DocumentStatus",
          $filter: "Cancelled eq 'tNO'",
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get delivery notes. ${data.error.message.trim()}`,
      };

    if (data?.value?.length)
      return {
        data: data.value.map((item: any) => {
          return {
            cardCode: item.CardCode,
            docStatus: item.DocumentStatus,
          };
        }),
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not get delivery notes. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default getDeliveryNotes;
