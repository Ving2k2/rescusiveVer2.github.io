import logoutUser from "../apiServices/user/logoutUser.js";

async function handerLogout() {
    const res = await logoutUser()
    const blockUser = document.getElementById("blockUser");
    blockUser.style.display = "none";
    let buttonRegister = document.getElementById("buttonRegister");
    let buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.style.display = "block";
    buttonRegister.style.display = "block";
    document.getElementById("new-post").innerHTML='';
    console.log(document.getElementById("new-post"));
    console.log(res);
}

    $(document).on('click', '#buttonLogout',(e)=>{handerLogout()})


// const buttonLogout = document.querySelector("#buttonLogout");
// console.log(buttonLogout);
// buttonLogout.addEventListener('click',(e) => {
//     e.preventDefault()
//     handerLogout()
// });
