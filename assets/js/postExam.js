import addExam from "../apiServices/exam/addExam.js";
import getUserById from "../apiServices/user/getUserById.js";
import { getCookie } from "../utils/libCookie.js";
import {url} from "./enviroment.js";




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
    const res = await addExam(exam)
    if (res == "Add exam successfully") {
        window.alert("Add exam successfully");
        window.location.href = `${url}/index.html`;
    } else if (res == "Exam already exists") {
        window.alert("Exam already exists");
    } else {
        window.alert("Error");
    }
}
$(document).on('click', '.buttonPostExam',(e) =>{handerPostExam(e)} )

// document.querySelector("#buttonPostExam").addEventListener('click', (e) => handerPostExam(e));

