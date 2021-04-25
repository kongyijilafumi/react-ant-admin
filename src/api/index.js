import ajax from "@/common/ajax";
import mock from "../mock/index";
const request = process.env.REACT_APP_MOCK ? mock : ajax;
const getMenu = () => request.get("/getmenu");
const login = (data) => request.post("/login", data);
const addMenu = (data) => request.post("/addmenu", data);
const addMsg = (data) => request.post("/addmessage", data);
const getMsg = (data) => request.post("/getmessage", data);
const getPower = () => request.get("/getpower");
const delMenu = (data) => request.post("/delmenu", data);
const getMenuInfo = (data) => request.post("/getmenuinfo", data);
const editMenu = (data) => request.post("/editmenuinfo", data);
const getVistor = (data) => request.post("/getiplist", data);

export {
  getMenu,
  login,
  addMenu,
  addMsg,
  getMsg,
  getPower,
  delMenu,
  getMenuInfo,
  editMenu,
  getVistor
};
