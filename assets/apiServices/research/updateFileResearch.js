import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

/**
 *
 * @param {*} idReseach
 * @param {*} data
 * @returns
 * Data ở đây cũng cần sử dụng FormData để tạo và tên của trường đó là image
 */

const updateImageResearch = async (idReseach, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`research/update/file/${idReseach}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateImageResearch;
