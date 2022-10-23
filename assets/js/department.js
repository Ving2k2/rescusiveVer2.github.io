
import getUserById from "../apiServices/user/getUserById.js"
import getDepartment from "../apiServices/department/getAllDepartment.js"

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
            const codeHtml =  `
            <li class="side-nav-item item-link">
                    <a href="javascript: void(0);" class="side-nav-link item-link">
                        <i class="fa-solid fa-flask"></i>
                        <span> ${nameDepartment} </span>
                        <span class="menu-arrow"></span>
                    </a>
                    <ul class="side-nav-second-level item-link" aria-expanded="false">
                        <li>
                            <a href="#" class="item-link">Hóa học</a>
                        </li>
                        <li>
                            <a href="#" class="item-link">Thực phẩm</a>
                        </li>
                    </ul>
                </li>`  

          const div = document.createElement("div")
          div.innerHTML = codeHtml
          container.appendChild(div)
        });
        // console.log(codeHtml);
      }
}

getAllDepartment()
