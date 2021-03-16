import ajax from "@/common/ajax";

const getsad = (params) => ajax.get("/getLubo");
const asdasf = () =>
  ajax.post("/findAll");
export { getsad, asdasf };
