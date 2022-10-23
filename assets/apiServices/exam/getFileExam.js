import { get } from "../../utils/request.js";


const getFileExam = async (idExam) => {
  try {
    const res = await get(`exam/file/${idExam}`);
    const uri = `data:${res.type};base64,` + res.data;
    return uri;
  } catch (error) {
    console.log(error.message);
  }
};

export default getFileExam;
