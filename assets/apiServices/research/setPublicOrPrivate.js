import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

/**
 *
 * @param {*} idReseach (id bài báo)
 * @param {*} data
 * @returns
 * data ở đây thì nên tạo 1 object để truyền vào trong data gồm các trường
 * isPublic
 */

const setPublicOrPrivate = async (idReseach, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`research/update/status/${idReseach}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default setPublicOrPrivate;
