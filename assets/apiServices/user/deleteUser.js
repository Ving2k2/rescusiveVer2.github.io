import { getCookie } from "../../utils/libCookie.js";
import { deletee } from "../../utils/request.js";
import {headerCORS} from "../../utils/request.js";

const deleteUser = async (idUser) => {
  try {
    const idToken = getCookie("idToken");
    const res = await deletee(`/user/delete/${idUser}`, {
      headers: {...{
        idtoken: idToken,
    },...headerCORS} ,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteUser;
