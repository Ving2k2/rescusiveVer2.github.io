import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";
import {headerCORS} from "../../utils/request.js";

/**
 * @param {*} idUser
 * @param {*} data (Trong data gồm có firstName, lastName, email, password)
 * const newUser = {
        firstName,
        lastName,
        email,
        codeSudentOrLecturers
    }
* Data gửi lên cần có cấu trúc như này
 */
const updateUser = async (idUser, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`/user/update/${idUser}`, data, {
      headers: {...{
        idtoken: idToken,
    },...headerCORS} ,
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateUser;
