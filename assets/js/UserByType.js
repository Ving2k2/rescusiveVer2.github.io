import getAlluserByType from "../apiServices/user/getAllUserByType.js";

const person = document.getElementsByClassName("person1");

const maSV = document.getElementById("maSV").innerText;
const fullName = document.getElementById("fullName").innerText;
const trangThai = document.getElementById("trangThai").innerText;
const date = document.getElementById("date").innerText;

console.log(maSV);
console.log(fullName);
console.log(trangThai);
console.log(date);

const table = document.getElementById("table");
console.log(table);

const codeHtml = `
<tr class="text-gray-700 dark:text-gray-400">
<td class="px-4 py-3 text-sm">
  
  <h2 class="text-pi"> 1 </h2>
</td>
<td class="px-4 py-3 text-sm">
  <!-- MSV-->
  <h2 id="maSV" class="text-purple-800"> ${maSV.value} </h2>
</td>
<td class="px-4 py-3">
  <div class="flex items-center text-sm">
    <!-- Avatar with inset shadow -->
    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
      <img class="object-cover w-full h-full rounded-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqOPXLlEkB6XnnKpTJSjvEJK3gpfmf8RpotA&usqp=CAU"
        alt="" loading="lazy" />
      <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
    </div>
    <div>
      <p id="fullName" class="font-semibold">${fullName}</p>
      <p class="typeOfPerson" class="text-xs text-gray-600 dark:text-gray-400">
        ${student[0]}
      </p>
    </div>
  </div>
</td>
<td class="px-4 py-3 text-sm">
  <!-- link đề tài-->
</td>
<td class="px-4 py-3 text-xs">
  <span id="trangThai"
    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
    ${trangThai}
  </span>
</td>
<td id="date" class="px-4 py-3 text-sm">
  ${date}
</td>
<td class="px-4 py-3">
  <div class="flex items-center space-x-4 text-sm">
    <button
      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
      aria-label="Edit">
      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
        </path>
      </svg>
    </button>
    <button
      class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
      aria-label="Delete">
      <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd"
          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
          clip-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</td>
</tr>
`
const tr = document.createElement("tr")
tr.innerHTML = codeHtml;
table.appendChild(tr);
console.log(table);
console.log(codeHtml)

// async function getUser() {
//     const idUser = getCookie("idUser")
//     const user = await getUserByID(idUser)

//     const buttonAvatar = document.getElementsByClassName("buttonAvatar");
//     const buttonRegister = document.getElementById("buttonRegister");
//     const nameUser = document.getElementById("nameUser");
//     const buttonProfile = document.getElementById("buttonProfile");
//     if (user) {
//         buttonRegister.style.display = "none";
//         buttonAvatar[0].style.display = "block";
//         const fullName = user.firstName + " " + user.lastName;
//         nameUser.innerText = fullName;

//     }
// }

// getUser()