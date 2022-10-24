import logoutUser from "../apiServices/user/logoutUser.js";

const buttonLogout = document.getElementById("buttonLogout");

async function handerLogout() {
    const res = await logoutUser()
    const blockUser = document.getElementById("blockUser");
    blockUser.style.display = "none";
    let buttonRegister = document.getElementById("buttonRegister");
    let buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.style.display = "block";
    buttonRegister.style.display = "block";
    console.log("res", res)
}

buttonLogout.addEventListener('click',(e) => {
    e.preventDefault()
    handerLogout()
});