import { get } from "../utils/request";

/**
 * @param {*} name (Tên đề thi)
 * @param {*} page (Trang)
 * @returns
 */

const getExamByName = async (name, page = 1) => {
  try {
    const res = await get(`exam/?name=${name}&page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getExamByName;
