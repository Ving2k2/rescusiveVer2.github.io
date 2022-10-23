import { getCookie } from "../../utils/libCookie.js";
import { get } from "../../utils/request.js";

/**
 * @param {*} id
 * id người dùng
 */
const getUserById = async (id) => {
  try {
    const idToken = getCookie("idToken");
    const idUser = getCookie("idUser");
    const res = await get(`/user/${id}`, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getUserById;
