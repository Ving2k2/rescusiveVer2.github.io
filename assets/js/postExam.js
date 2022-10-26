import addExam from "../apiServices/exam/addExam.js";
import getUserById from "../apiServices/user/getUserById.js";
import { getCookie } from "../utils/libCookie.js";
import {url} from "./enviroment.js";
import getDepartmentByName from "../apiServices/department/getDepartmentByName.js";
import getSubjectByName from "../apiServices/subject/getSubjectByName.js";
import setExamPublicOrPrivate from "../apiServices/exam/setExamPublicOrPrivate.js";
import getExamByName from "../apiServices/exam/getExamByName.js";


var tmpname = "";

async function handerPostExam(e) {
    const idUserPost = getCookie("idUser");
    const user = await getUserById(idUserPost);
    const userPost = `${user.firstName} ${user.lastName}`;
    console.log(userPost);
    const nameDepartment = document.getElementById("name-department").value;
    const deapartment = await getDepartmentByName(nameDepartment);
    console.log(deapartment);
    const idDepartment = deapartment[0]._id;


    const nameSubject = document.getElementById("name-subject").value;
    const subject = await getSubjectByName(nameSubject);
    console.log(subject);
    const idSubject = subject[0]._id;

    const nameExam = document.getElementById("name-exam").value;
    tmpname = nameExam;
    const fileExam = $("#file-neee").val();
    const exam = {
        name: nameExam,
        idDepartment: idDepartment,
        idExamSubject: idSubject,
        fileExam: fileExam,
        idUserPost: idUserPost,
        userPost: userPost
    }
    const res = addExam(exam)
    if (res) {
        makeAdminPublic();
    }
}
$(document).on('click', '.buttonPostExam',(e) =>{handerPostExam(e)} )

const makeAdminPublic = async () => {
    const idUser = getCookie("idUser");
    const user = await getUserById(idUser);
    console.log(tmpname);
    if (user.isAdmin) {
        const searchExam = await getExamByName(tmpname);
        console.log(searchExam);
        if (searchExam.length > 0) {
            setExamPublicOrPrivate(searchExam[0]._id, true);
        }
    }
}
// document.querySelector("#buttonPostExam").addEventListener('click', (e) => handerPostExam(e));

