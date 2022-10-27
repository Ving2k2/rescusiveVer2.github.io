import addExam from "../apiServices/exam/addExam.js";
import getUserById from "../apiServices/user/getUserById.js";
import { getCookie } from "../utils/libCookie.js";
import {url} from "./enviroment.js";
import getDepartmentByName from "../apiServices/department/getDepartmentByName.js";
import getSubjectByName from "../apiServices/subject/getSubjectByName.js";
import setExamPublicOrPrivate from "../apiServices/exam/setExamPublicOrPrivate.js";
import getExamByName from "../apiServices/exam/getExamByName.js";



async function handerPostExam(e) {
    const idUserPost = getCookie("idUser");
    const user = await getUserById(idUserPost);
    const userPost = `${user.firstName} ${user.lastName}`;

    const idDepartment = document.getElementById("name-department").value;

    const idSubject = document.getElementById("name-subject").value;
    const nameExam = document.getElementById("name-exam").value;
    const fileExam = $("#file-neee").val();
    const exam = {
        name: nameExam,
        idDepartment: idDepartment,
        idExamSubject: idSubject,
        fileExam: fileExam,
        idUserPost: idUserPost,
        userPost: userPost
    }
    console.log(exam);
    const res = addExam(exam)
    console.log(res);
}
$(document).on('click', '.buttonPostExam',(e) =>{handerPostExam(e)} )

// document.querySelector("#buttonPostExam").addEventListener('click', (e) => handerPostExam(e));

