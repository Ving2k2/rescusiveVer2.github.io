import logoutUser from "../apiServices/user/logoutUser.js";

async function handerLogout() {
    const res = await logoutUser()
    const blockUser = document.getElementById("blockUser");
    blockUser.style.display = "none";
    let buttonRegister = document.getElementById("buttonRegister");
    let buttonLogin = document.getElementById("buttonLogin");
    buttonLogin.style.display = "block";
    buttonRegister.style.display = "block";
    document.getElementById("new-post").innerHTML=''
    console.log("res", res)
}

document.body.addEventListener( 'click', function ( e ) {
  if( e.target.id == 'buttonLogout' ) {
    e.preventDefault()
    handerLogout()
  };
} );

// document.getElementById("buttonLogout").addEventListener('click',(e) => {
//     e.preventDefault()
//     handerLogout()
// });
