import getUserByID from "../apiServices/user/getUserById.js"
import { getCookie } from "../utils/libCookie.js"
import getAllResearch from "../apiServices/research/getAllResearch.js";
import getAllExam from "../apiServices/exam/getAllExam.js";
import getAllDepartment from "../apiServices/department/getAllDepartment.js"
// console.log(buttonAvatar);

async function getUser() {
    const idUser = getCookie("idUser")
    const user = await getUserByID(idUser)

    const userName = document.getElementById("userName");
    const typeUser = document.getElementById("typeUser");
    // const avatar = await getAvatarUser(user._id);
    // const nameUser = document.getElementById("nameUser");
    // const buttonProfile = document.getElementById("buttonProfile");
    const buttonAdmin = document.querySelector("#buttonAdmin");
    const buttonGV = document.querySelector("#buttonGV");
    const buttonSV = document.querySelector("#buttonSV");
    console.log(buttonAdmin);
    buttonAdmin.style.display = "block !important";
    console.log(buttonAdmin);
    if (user) {
        userName.innerText = user.firstName + " " + user.lastName;
        let buttonRegister = document.getElementById("buttonRegister");
        let buttonLogin = document.getElementById("buttonLogin");
        buttonLogin.style.display = "none";
        buttonRegister.style.display = "none";
            if (user.isAdmin) {
                typeUser.innerText = "Admin";
                buttonAdmin.style.display = "block";
            } else if (user.isStudent) {
                typeUser.innerText = "Sinh viên";
                buttonSV.style.display = "block";
            } else {
                typeUser.innerText = "Giảng viên";
                buttonGV.style.display = "block";
            }
        }
    }



getUser();

// async function getDataResearch () {
//     const data = await getAllResearch()
//     console.log(data);
// }

// getDataResearch()

//  async function getDataExam () {
//      const data = await getAllExam()
//      console.log(data);  
//  }
// getDataExam()

//  async function getDataDepartment () {
//      const data = await getAllDepartment()
//      console.log(data);  
//  }

// getDataDepartment()

