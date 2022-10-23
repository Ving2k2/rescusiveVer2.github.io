import { get } from "../../utils/request.js";

/**
 *
 * @param {*} id (id bài báo cần lấy ảnh)
 * @returns
 */

const getFileResearchbyId = async (id) => {
  try {
    const res = await get(`research/file/${id}`);
    const uri = `data:${res.type};base64,` + res.data;
    return uri;
  } catch (error) {
    console.log(error.message);
  }
};

export default getFileResearchbyId;
