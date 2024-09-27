import { Context as BaseContext, Scenes } from "telegraf";
import User from "../database/models/User";

interface Context extends BaseContext {
  scene: Scenes.SceneContextScene<Context>;
  user: User | null;
}

export default Context;
