
import { getCookie } from "../../utils/libCookie.js";
import { get } from "../../utils/request.js";

function base64encode(data) {
  return btoa(data.map((v) => String.fromCharCode(v)).join(""));
}

const getAvatarUser = async (idUser) => {
  try {
    const idToken = getCookie("idToken");
    const res = await get(`/user/avatar/${idUser}`, {
      headers: {
        idtoken: idToken,
      },
    });
    const uri = `data:${res.type};base64,` + res.data;
    return uri;
  } catch (error) {
    console.log(error);
  }
};

export default getAvatarUser;
