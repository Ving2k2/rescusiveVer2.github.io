import { getCookie } from "../../utils/libCookie.js";
import { get } from "../../utils/request.js";

const logoutUser = async () => {
  try {
    const idToken = getCookie("idToken");
    const res = await get("/user/logout", {
      headers: {
        idtoken: idToken,
      },
    });
    document.cookie = "idToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "idUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default logoutUser;
