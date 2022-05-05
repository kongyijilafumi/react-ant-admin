import ajax from "@/common/ajax";
import mock from "../mock/index";
const request = process.env.REACT_APP_MOCK === "1" ? mock : ajax;
const getMenu = () => request.get("/getmenu");
const getMenuList = () => request.get("/getmenulist");
const login = (data) => request.post("/login", data);
const addMenu = (data) => request.post("/addmenu", data);
const addMsg = (data) => request.post("/addmessage", data);
const getMsg = (data) => request.get("/getmessage", data);
const getPower = () => request.get("/getpower");
const delMenu = (data) => request.post("/delmenu", data);
const getMenuInfo = (data) => request.get("/getmenuinfo", data);
const editMenu = (data) => request.post("/editmenuinfo", data);
const getVisitorList = (data) => request.get("/getiplist", data);
const getVisitorData = () => request.get("/getvisitordata");
const getUserList = (data) => request.get("/getuserlist", data);
const addUser = (data) => request.post("/adduserinfo", data);
const getUser = (data) => request.get("/getuserinfo", data);
const editUser = (data) => request.post("/edituserinfo", data);
const editType = (data) => request.post("/edittype", data);
const addType = (data) => request.post("/addtype", data);
const getFeedBack = (data) => request.post("/getfeedback", data);
const reply = (data) => request.post("/reply", data);
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
  getVisitorList,
  getVisitorData,
  getUserList,
  addUser,
  getUser,
  editUser,
  editType,
  addType,
  getMenuList,
  getFeedBack,
  reply,
};
