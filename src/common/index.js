import { getLocalMenu, saveLocalMenu } from "../utils";
import { getMenu } from "@/api";
const RouterBasename = "/react-ant-admin";

function getMenus() {
  return new Promise((res, rej) => {
    let localMenu = getLocalMenu();
    if (localMenu) {
      return res(localMenu);
    }
    getMenu()
      .then((result) => {
        if (result) {
          saveLocalMenu(result);
          res(result);
        }
      })
      .catch((err) => {
        res({ data: [], mapKey: [], type: [] });
      });
  });
}

export { getMenus, RouterBasename };
