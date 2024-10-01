interface AddPurchaseData {
  skip: number;
  order: {
    name: string;
    code: string;
  };
  orders: [
    {
      name: string;
      code: string;
      quantity: string;
    }
  ];
  comment: string;
}

export default AddPurchaseData;
