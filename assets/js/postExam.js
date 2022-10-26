import addExam from "../apiServices/exam/addExam.js";
import getUserById from "../apiServices/user/getUserById.js";
import { getCookie } from "../utils/libCookie.js";
import {url} from "./enviroment.js";
import getDepartmentByName from "../apiServices/department/getDepartmentByName.js";
import getSubjectByName from "../apiServices/subject/getSubjectByName.js";

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
    const fileExam = $("#file-neee").val();
    
        // const file = fileList[0];
        // const formData = new FormData();
        // formData.append("file", file);
        // const res = await addExam(idUserPost, idDepartment, idSubject, nameExam, userPost, formData);
        // console.log(res);
        // if (res) {
        //     window.location = url+"/listExam.html"
        // }
    
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
    if (res) {
        // window.location = url+"/index.html"
    }

}
$(document).on('click', '.buttonPostExam',(e) =>{handerPostExam(e)} )

// document.querySelector("#buttonPostExam").addEventListener('click', (e) => handerPostExam(e));

