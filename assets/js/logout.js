import logoutUser from "../apiServices/user/logoutUser.js";

async function handerLogout() {
    const res = await logoutUser()
    console.log(res);
    window.location.reload();
}

$(document).on('click', '#buttonLogout',(e)=>{handerLogout()})


// const buttonLogout = document.querySelector("#buttonLogout");
// console.log(buttonLogout);
// buttonLogout.addEventListener('click',(e) => {
//     e.preventDefault()
//     handerLogout()
// });
