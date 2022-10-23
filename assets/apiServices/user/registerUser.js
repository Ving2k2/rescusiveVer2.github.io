import { post } from "../../utils/request.js";

/**
 * @param {*} data (Trong data gồm có fristName, lastName, email, password)
 * const newUser = {
        firstName,
        lastName,
        email,
        password,
        codeSudentOrLecturers
    }
* Data gửi lên cần có cấu trúc như này
 */
const registerUser = async (data) => {
  try {
    const res = await post("/user/register", data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default registerUser;
