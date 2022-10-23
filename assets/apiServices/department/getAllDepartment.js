import { get } from "../../utils/request.js";

/**
 *
 * @param {*} page
 * @returns
 * Cần truyền thêm page để việc lấy dữ liệu được nhanh hơn
 * và cũng như tiện cho việc phân trang mỗi trang sẽ có 10 Khoa
 */

const getAllDepartment = async (page = 1) => {
  try {
    const res = await get(`department/?page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getAllDepartment;
