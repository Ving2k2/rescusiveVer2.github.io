import addExam from "../apiServices/exam/addExam.js";
import getUserById from "../apiServices/user/getUserById.js";
import { getCookie } from "../utils/libCookie.js";
import {url} from "./enviroment.js";

async function handerPostExam(e) {
    const idUserPost = getCookie("idUser");
    const user = await getUserById(idUserPost);
    const userPost = `${user.firstName} ${user.lastName}`;
    console.log(userPost);
    e.preventDefault()
    const name = document.getElementById("post-content-edit").value;
    const fileExam = document.getElementById("file-input").value;

    const exam = {
        name: name,
        idDepartment: 123,
        idExamSubject: 321,
        fileExam: fileExam,
        idUserPost: idUserPost,
        userPost: userPost
    }
    console.log(exam);

    const res = await addExam(exam)
    console.log(res);
    if (res) {
        window.location = url+"/index.html"
    }

}
$(document).on('click', '#buttonPostExam',(e) =>{handerPostExam(e)} )

// document.querySelector("#buttonPostExam").addEventListener('click', (e) => handerPostExam(e));

