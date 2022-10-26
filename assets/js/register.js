import axios from "axios";
import registerUser from "../apiServices/user/registerUser.js";
import {url} from "./enviroment.js";

// đăng ký

const buttonRegister = document.querySelector(".buttonRegister");

const isLecturers = document.querySelector("#pickGV").checked ? 1 : 0 ;
const isStudent = document.querySelector("#pickSV").checked ? 1 : 0;


console.log(isStudent);
console.log(isLecturers)

async function handerRegister(e) {
    e.preventDefault()
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const emailRegister = document.getElementById("emailRegister").value;
    const personCode = document.getElementById("personCode").value;
    const passwordRegister = document.getElementById("passwordRegister").value;
    const passwordRegisterAgain = document.getElementById('passwordRegisterAgain').value;

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: emailRegister,
        password: passwordRegister,
        codeSudentOrLecturers: personCode,
        isLecturers: isLecturers,
        isStudent: isStudent,

    }
    const res = await registerUser(user)
    console.log(res);
    if (res) {
        window.location = url+"/login.html"
    } else {
        alert("oops! Có vẻ như thông tin bạn nhập chưa chính xác! Vui lòng nhập lại nha")
    }

}

buttonRegister.addEventListener('click', (e) => handerRegister(e));




