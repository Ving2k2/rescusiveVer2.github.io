import { get } from "../../utils/request.js";

/**
 * @param {*} name (Tên khoa)
 * @param {*} page (Trang)
 * @returns
 * Lưu ý việc gọi api này chỉ lấy ra thông tin của bài báo
 * chứ không lấy ảnh bài báo đó nên lấy ảnh cần gọi api getImageResearchById
 * */

const getDepartmentByName = async (name, page = 1) => {
  try {
    const res = await get(`department/?name=${name}&page=${page}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getDepartmentByName;
