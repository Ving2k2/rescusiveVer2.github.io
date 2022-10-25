import { get } from "../../utils/request.js";

const getExamById = async (idExam) => {
    try {
        const res = await get(`exam/${idExam}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

export default getExamById;