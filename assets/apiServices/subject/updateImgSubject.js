import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

/**
 *  @param {*} idSubject (id môn học)
 * @param {*} data
 * @returns
 */

const updateImgSubject = async (idSubject, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`subject/update/img/${idSubject}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateImgSubject;
