import { getCookie } from "../../utils/libCookie.js";
import { put } from "../../utils/request.js";

const setExamPublicOrPrivate = async (idExam, data) => {
  try {
    const idToken = getCookie("idToken");
    const res = await put(`/exam/update/status/${idExam}`, data, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default setExamPublicOrPrivate;
