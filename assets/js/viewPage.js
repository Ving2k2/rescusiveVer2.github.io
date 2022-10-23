import getUserById from "../apiServices/user/getUserById";
import getAllExam from "../apiServices/exam/getAllExam";


async function getUser(id) {
    const user = await getUserById(id)
    if (user) {
        return user
    }
}


