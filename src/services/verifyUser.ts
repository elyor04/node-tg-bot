import axios from "axios";
import { SAP_BASE_URL } from "../utils/config";
import loginToSAP from "./login";

const verifyUser = async (phone: string) => {
  const loginResult = await loginToSAP();

  if (loginResult?.error)
    return {
      error: loginResult.error,
    };

  try {
    const data = await axios
      .get(`${SAP_BASE_URL}/ServiceLayer/b1s/v2/EmployeesInfo`, {
        params: {
          $filter: `contains(OfficePhone, '${phone}') or contains(MobilePhone, '${phone}') or contains(HomePhone, '${phone}')`,
          $select: "EmployeeID, JobTitle, FirstName, LastName, MiddleName",
        },
        headers: {
          Cookie: loginResult.cookies,
        },
      })
      .then((res) => res.data);

    if (data?.error?.message)
      return {
        error: `Could not verify user. ${data.error.message.trim()}`,
      };

    if (data?.value?.length)
      return {
        data: {
          employeeID: data.value[0].EmployeeID,
          jobTitle: data.value[0].JobTitle,
          employeeName: {
            first: data.value[0].FirstName,
            last: data.value[0].LastName,
            middle: data.value[0].MiddleName,
          },
        },
      };

  } catch (err) {
    // @ts-ignore
    const errorMessage = err?.response?.data?.error?.message || `${err?.name} - ${err?.message}`;
    return {
      error: `Could not verify user. ${errorMessage.trim()}`,
    };
  }

  return {
    data: null,
  };
};

export default verifyUser;
