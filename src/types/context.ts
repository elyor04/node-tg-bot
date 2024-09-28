import { Context as BaseContext, Scenes } from "telegraf";
import User from "../database/models/User";
import SessionData from "./sessionData";

interface Context extends BaseContext {
  session: Scenes.WizardSession<SessionData>;
  scene: Scenes.SceneContextScene<Context, SessionData>;
  wizard: Scenes.WizardContextWizard<Context>;
  user: User;
}

export default Context;
