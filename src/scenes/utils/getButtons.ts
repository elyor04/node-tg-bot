import { Markup } from "telegraf";
import chunkArray from "./chunkArray";
import Item from "../../types/item";

const getButtons = (data: Item[], prevButton = false) => {
  let nextButton = false;

  if (data.length > 10) {
    data = data.slice(0, 10);
    nextButton = true;
  }

  const arrItems = chunkArray(data, 2);

  const buttons = arrItems.map((items) => {
    if (items.length === 2)
      return [
        Markup.button.callback(
          items[0].itemName,
          `${items[0].itemName}:${items[0].itemCode}`
        ),
        Markup.button.callback(
          items[1].itemName,
          `${items[1].itemName}:${items[1].itemCode}`
        ),
      ];
    else
      return [
        Markup.button.callback(
          items[0].itemName,
          `${items[0].itemName}:${items[0].itemCode}`
        ),
      ];
  });

  if (prevButton) {
    buttons.push([Markup.button.callback("<<", "<<")]);
  }
  if (nextButton) {
    if (prevButton)
      buttons[buttons.length - 1].push(Markup.button.callback(">>", ">>"));
    else buttons.push([Markup.button.callback(">>", ">>")]);
  }

  return buttons;
};

export default getButtons;
