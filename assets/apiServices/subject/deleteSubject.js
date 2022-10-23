import { getCookie } from "../../utils/libCookie.js";
import { deletee } from "../../utils/request.js";

const deleteSubject = async (idSubject) => {
  try {
    const idToken = getCookie("idToken");
    const res = await deletee(`/subject/delete/${idSubject}`, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteSubject;
