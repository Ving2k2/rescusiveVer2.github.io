import { getCookie } from "../../utils/libCookie.js";
import { post } from "../../utils/request.js";

/**
 * @param {*} data (Trong data gồm có name, school, userCreate, imgSchool, idDepartment)
 * @returns {String}
 * const subject = {
 * name,
 * school,
 * userCreate,
 * imgSchool,
 * idDepartment
 * }
 * Data nên dùng FormData để gửi lên
 */

const addSubject = async (data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await post("subject/add", data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default addSubject;
