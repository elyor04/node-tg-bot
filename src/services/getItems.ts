import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";
import Item from "../types/item";

const getItems = async (
  top: number = 100,
  skip: number = 0
): Promise<
  | {
      error: string;
      data?: undefined;
    }
  | {
      data: Item[] | null;
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
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/Items`, {
        params: {
          $top: top,
          $skip: skip,
          $select: "ItemName, ItemCode",
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not get items. ${data.error.message.trim()}`,
      };

    if (data?.value?.length)
      return {
        data: data.value.map((item: any) => {
          return {
            itemName: item.ItemName,
            itemCode: item.ItemCode,
          };
        }),
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

export default getItems;
