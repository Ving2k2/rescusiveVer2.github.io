import { put } from "../../utils/request.js";

const countExamDownload = async (idExam) => {
  try {
    const res = await put(`exam/update/count/${idExam}`);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default countExamDownload;
