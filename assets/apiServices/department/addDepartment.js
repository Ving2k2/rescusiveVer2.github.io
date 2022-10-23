import { getCookie } from "../../utils/libCookie.js";
import { post } from "../../utils/request.js";

/**
 *  @param {*} data (Trong data gồm có name)
 * @returns {String}
 * const department = {
 * name
 * }
 * Data gửi lên cần có cấu trúc như này
 * */

const addDepartment = async (data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await post("department/add", data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default addDepartment;
