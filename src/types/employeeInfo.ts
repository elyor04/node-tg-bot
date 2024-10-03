interface EmployeeInfo {
  employeeID: number;
  jobTitle: string;
  employeeName: {
    first: string;
    last: string;
    middle: string;
  };
  cardCode: string;
}

export default EmployeeInfo;
