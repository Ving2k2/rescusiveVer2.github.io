import { get } from "../../utils/request.js";
/**
 * @param {*} idDepartment (Mã khoa)
 * @param {*} idSubject (Mã chủ đề)
 * @param {*} page (Trang)
 * @returns
 */

const getExamBy2Id = async (idDepartment, idSubject, page = 1) => {
  try {
    const res = await get(
      `exam/search/?idDepartment=${idDepartment}&idExamSubject=${idSubject}&page=${page}`
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getExamBy2Id;
