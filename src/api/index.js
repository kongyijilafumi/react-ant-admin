import ajax from "@/common/ajax";

const getMenu = () => ajax.get("/api/react-ant-admin/getmenu");
const login = (data) => ajax.post("/api/react-ant-admin/login", data);
const addMenu = (data) => ajax.post("/api/react-ant-admin/addmenu", data);
const addMsg = (data) => ajax.post("/api/react-ant-admin/addmessage", data);
const getMsg = (data) => ajax.post("/api/react-ant-admin/getmessage", data);
export { getMenu, login, addMenu, addMsg, getMsg };
