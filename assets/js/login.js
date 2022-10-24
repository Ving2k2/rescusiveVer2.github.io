import loginUser from "../apiServices/user/loginUser.js";

const buttonLogin = document.querySelector(".button-login");
async function handerLogin(e) {
    e.preventDefault()
    const textemail = document.querySelector(".emailLogin").value;
    const userpasswordLogin = document.querySelector(".passwordLogin").value;
    const user = {
        email: textemail,
        password: userpasswordLogin
    }
    const res = await loginUser(user)
    if (res) {
        window.location = "/index.html"
    } else {
        alert("Tài khoản hoặc mật khẩu không đúng! Vui lòng nhâp lại")
    }
}

buttonLogin.addEventListener('click', (e) => handerLogin(e));