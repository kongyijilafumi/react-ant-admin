import ajax from "@/common/ajax";

const getMenu = () => ajax.get("/getmenu");
const login = (data) => ajax.post("/login", data);
const addMenu = (data) => ajax.post("/addmenu", data);
const addMsg = (data) => ajax.post("/addmessage", data);
const getMsg = (data) => ajax.post("/getmessage", data);
const getPower = () => ajax.get("/getpower");
const delMenu = (data) => ajax.post("/delmenu", data);
const getMenuInfo = (data) => ajax.post("/getmenuinfo", data);
const editMenu = (data) => ajax.post("/editmenuinfo", data);
export {
  getMenu,
  login,
  addMenu,
  addMsg,
  getMsg,
  getPower,
  delMenu,
  getMenuInfo,
  editMenu
};
