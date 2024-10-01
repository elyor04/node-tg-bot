import { Scenes } from "telegraf";
import AddPurchaseData from "./addPurchaseData";

interface SessionData extends Scenes.WizardSessionData {
  addPurchase: AddPurchaseData;
}

export default SessionData;
