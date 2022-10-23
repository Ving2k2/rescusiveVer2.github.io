import { get } from "../../utils/request.js";
/**
 * @param {*} page (Trang)
 * @returns
 */

const getAllExam = async (page = 1) => {
  try {
    const res = await get(`exam/?page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllExam;
