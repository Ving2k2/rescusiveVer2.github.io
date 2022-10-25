
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
    var idDepartment = [];
    var idSubject = [];
    const data = await getDepartment()
    if(data) {
        const container = document.querySelector(".box__department")
        // var codeHtml = "";
        
         data.forEach(async(item, index) => {
            const nameDepartment = item.name
            
            var codeHtml =  `
                    <a href="javascript: void(0);" class="side-nav-link item-link get_id">
                        <i class="fa-solid fa-flask"></i>
                        <span> Khoa ${nameDepartment} </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="side-nav-second-level item-link" aria-expanded="false">`
        
          const subject = await getSubjectByIdDepartment(item._id)
            subject.forEach(item2 => {
                const nameSubject = item2.name
                idSubject.push(item2._id)
                codeHtml += `
                    <li>
                    <a href="#" class="item-link get_id_subject">${nameSubject}</a>
                    </li>
                `
            })
          codeHtml += `</ul>`
          const li = document.createElement("li")
          li.className = "side-nav-item item-link"
          li.innerHTML = codeHtml
          container.appendChild(li)
        
          idDepartment.push(item._id)
          const lis = document.querySelectorAll(".get_id")
            lis.forEach((item,index) => {
                item.addEventListener("click", function() {
                    sessionStorage.setItem("idDepartment", idDepartment[index])
                })
            })

            const lis2 = document.querySelectorAll(".get_id_subject")
            lis2.forEach((item,index) => {
                item.addEventListener("click", function() {
                    sessionStorage.setItem("idSubject", idSubject[index])
                })
            })
        });
      }
};
getAllDepartment()
