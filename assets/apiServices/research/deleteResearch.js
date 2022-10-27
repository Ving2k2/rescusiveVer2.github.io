import { getCookie } from "../../utils/libCookie.js";
import { deletee } from "../../utils/request.js";

const deleteResearch = async (idResearch) => {
    try {
        const idToken = getCookie("idToken");
        const res = await deletee(`research/delete/${idResearch}`, {
        headers: {
            idtoken: idToken,
        },
        });
        return res;
    } catch (error) {
        console.log(error.message);
    }
    };

export default deleteResearch;