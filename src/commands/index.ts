import { Scenes } from "telegraf";
import Context from "../types/context";
import startCommand from "./start";
import langCommand from "./lang";
import phoneCommand from "./phone";
import cancelCommand from "./cancel";

const registerCommands = (stage: Scenes.Stage<Context>) => {
  stage.command("start", startCommand);
  stage.command("lang", langCommand);
  stage.command("phone", phoneCommand);
  stage.command("cancel", cancelCommand);
};

export default registerCommands;
