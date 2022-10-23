import { getCookie } from "../../utils/libCookie.js";
import { post } from "../../utils/request.js";

/**
 *
 * @param {*} data
 * @returns {String}
 * Data ở đây thì nên tạo 1 object gồm 2 trường 1 là idArticleOrExam(id bài báo) 2 là comment(nội dung commnet)
 * để trền vào để tránh tình trạng lỗi không đáng có
 */

const addCommentResearch = async (data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await post("research/comment", data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default addCommentResearch;
