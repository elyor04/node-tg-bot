import { Scenes } from "telegraf";
import { message } from "telegraf/filters";
import Context from "../types/context";
import langHandler from "./lang";
import phoneHandler from "./phone";

const registerHandlers = (stage: Scenes.Stage<Context>) => {
  stage.hears(["🇺🇿 O'zbek", "🇷🇺 Русский", "🇬🇧 English"], langHandler);
  stage.on(message("contact"), phoneHandler);
};

export default registerHandlers;
