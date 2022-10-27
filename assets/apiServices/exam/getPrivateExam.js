import { get } from "../../utils/request";
import { getCookie } from "../../utils/libCookie";

const getPrivateExam = async () => {
    try {
        const idToken = getCookie("idToken");
    const res = await get(`/exam/find/private/}`, {
      headers: {
        idtoken: idToken,
      },
    });
    return res;
    } catch (error) {
        console.log(error.message);
    }
    }

export default getPrivateExam;