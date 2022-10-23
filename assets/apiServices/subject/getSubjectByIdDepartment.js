import { get } from "../../utils/request";

const getSubjectByIdDepartment = async (idDepartment) => {
    try {
        const res = await get(`subject/get/${idDepartment}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
    };

export default getSubjectByIdDepartment;