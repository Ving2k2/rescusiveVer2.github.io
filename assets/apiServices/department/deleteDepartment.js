import { getCookie } from "../../utils/libCookie.js";
import { deletee } from "../../utils/request.js";

const deleteDepartment = async (idDepartment) => {
  try {
    const idToken = getCookie("idToken");
    const res = await deletee(`/department/delete/${idDepartment}`, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default deleteDepartment;
