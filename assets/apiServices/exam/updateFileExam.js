import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

/**
 * @param {*} idExam
 * @param {*} data
 * @returns
 * Data ở đây dùng FormData
 */

const updateFileExam = async (idExam, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`exam/update/file/${idExam}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateFileExam;
