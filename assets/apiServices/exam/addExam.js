import { getCookie } from "../../utils/libCookie.js";
import { post } from "../../utils/request.js";

/**
 * @param {*} data (Trong data gồm có name, idDepartment, idExamSubject, flieExam, idUserPost, userPost)
 * @returns {String}
 * const exam = {
 * name,
 * idDepartment,
 * idExamSubject,
 * flieExam,
 * userPost
 * }
 * Data gửi lên cần có cấu trúc như này và dùng FormData
 * */

const addExam = async (data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await post("exam/add", data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default addExam;
