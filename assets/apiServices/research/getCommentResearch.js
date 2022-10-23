import { get } from "../../utils/request.js";
/**
 *
 * @param {*} id (id bài báo cần lấy comment)
 * @returns
 */
const getCommentResearch = async (id) => {
  try {
    const res = await get(`research/comment/${id}`);
    return res;
  } catch (error) {
    console.log(error.mesage);
  }
};

export default getCommentResearch;
