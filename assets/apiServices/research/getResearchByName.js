import { get } from "../../utils/request.js";

/**
 *
 * @param {*} name
 * @returns
 * Cần truyền thêm name để việc lấy dữ liệu
 */

const getAllResearchByName = async (name) => {
  try {
    const res = await get(`research/?name=${name}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllResearchByName;
