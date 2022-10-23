import { get } from "../../utils/request.js";

/**
 *
 * @param {*} name (Tên chủ đề)
 * @param {*} page (Trang)
 * @returns
 */

const getSubjectByName = async (name, page = 1) => {
  try {
    const res = await get(`subject/?name=${name}&page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getSubjectByName;
