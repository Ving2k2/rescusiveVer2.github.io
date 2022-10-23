import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";
/**
 *
 * @param {*} idExam
 * @param {*} data
 * @returns
 * data ở đây thì nên tạo 1 object để truyền vào trong data gồm các trường
 * name, idDepartment, idSubject
 */
const updateExam = async (idExam, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`/exam/update/${idExam}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateExam;
