import { get } from "../../utils/request.js";
import b64toBlob from "../../utils/base64toBolb";
import base64encode from "../../utils/buffToBase64";

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
