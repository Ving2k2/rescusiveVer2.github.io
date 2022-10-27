import { get } from "../../utils/request.js";

const getDepartmentById = async (idDepartment) => {
    try {
        const res = await get(`department/find/${idDepartment}`);
        return res;
    } catch (error) {
        console.log(error.message);
    }
    };

export default getDepartmentById;