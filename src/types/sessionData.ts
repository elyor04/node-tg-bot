import { Scenes } from "telegraf";

interface SessionData extends Scenes.WizardSessionData {
  addPurchase: {
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
  };
}

export default SessionData;
