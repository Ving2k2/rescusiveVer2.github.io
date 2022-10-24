
import getUserById from "../apiServices/user/getUserById.js"
import getDepartment from "../apiServices/department/getAllDepartment.js"
import getSubjectByIdDepartment from "../apiServices/subject/getSubjectByIdDepartment.js"
async function getUser(id) {
    const user = await getUserById(id)
    if (user) {
        return user
    }
}

const getAllDepartment = async () => {

    const data = await getDepartment()
    if(data) {
        const container = document.querySelector(".box__department")
        // var codeHtml = "";
        
         data.forEach(async(item, index) => {
            const nameDepartment = item.name
            var codeHtml =  `
                    <a href="javascript: void(0);" class="side-nav-link item-link">
                        <i class="fa-solid fa-flask"></i>
                        <span> ${nameDepartment} </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="side-nav-second-level item-link" aria-expanded="false">` 
          const subject = await getSubjectByIdDepartment(item._id)
            subject.forEach(item2 => {
                const nameSubject = item2.name
                codeHtml += `
                    <li>
                    <a href="#" class="item-link">${nameSubject}</a>
                    </li>
                `
            })
          codeHtml += `</ul>`
          const li = document.createElement("li")
          li.className = "side-nav-item item-link get__id"
          li.innerHTML = codeHtml
          container.appendChild(li)
        });
      }
}
getAllDepartment()
 
// const list = document.getElementsByClassName("get__id")
// console.log(list)
// Array.from(list).forEach(element => {
//      element.addEventListener('click', () => {
//       console.log("123");     
//     })
//  });