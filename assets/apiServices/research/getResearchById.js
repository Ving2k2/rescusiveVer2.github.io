import { get } from "../../utils/request.js";

/**
 *
 * @param {*} id (Id bài báo)
 * @returns {Array}
 * Lưu ý việc gọi api này chỉ lấy ra thông tin của bài báo
 * chứ không lấy ảnh bài báo đó nên lấy ảnh cần gọi api getImageResearchById
 */

const getResearchById = async (id) => {
  try {
    const res = await get(`research/${id}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getResearchById;
