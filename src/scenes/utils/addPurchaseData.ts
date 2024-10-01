import AddPurchaseData from "../../types/addPurchaseData";

let addPurchaseData: AddPurchaseData;

const set = (addPurchase: AddPurchaseData) => {
  addPurchaseData = addPurchase;
};

const get = () => {
  return addPurchaseData;
};

export default { set, get };
