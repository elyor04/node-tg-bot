import { Scenes } from "telegraf";
import AddPurchaseData from "./addPurchaseData";
import AddOutgoingPaymentData from "./addOutgoingPaymentData";

interface SessionData extends Scenes.WizardSessionData {
  addPurchase: AddPurchaseData;
  addOutgoingPayment: AddOutgoingPaymentData;
}

export default SessionData;
