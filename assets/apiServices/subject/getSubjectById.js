import { get } from "../../utils/request.js";

const getSubjectById = async (idSubject) => {
    try {
        const res = await get(`subject/find/${idSubject}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
};

export default getSubjectById;