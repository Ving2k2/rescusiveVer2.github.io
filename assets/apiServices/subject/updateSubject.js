import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

/**
 *  @param {*} idSubject (id môn học)
 *  @param {*} data
 *  @returns
 * data ở đây thì nên tạo 1 object để truyền vào trong data gồm các trường
 * name, school, idDepartment
 * */

const updateSubject = async (idSubject, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`subject/update/${idSubject}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default updateSubject;
