import { get } from "../../utils/request.js";

/**
 *
 * @param {*} page
 * @returns
 * Cần truyền thêm page để việc lấy dữ liệu được nhanh hơn
 * và cũng như tiện cho việc phân trang mỗi trang sẽ có 10 bài báo
 */

const getAllResearch = async (page = 1) => {
  try {
    const res = await get(`research/?page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllResearch;
