import getExam from "../apiServices/exam/getAllExam.js"
// import getExamByIdDepartment from "../apiServices/exam/getExamByIdDepartment.js"
// import getExamByIdSubject from "../apiServices/exam/getExamByIdSubject.js"
// import getExamBy2Id from "../apiServices/exam/getExamBy2Id.js"
// import getExamByName from "../apiServices/exam/getExamByName.js"
import getImgSchool from "../apiServices/subject/getImgSchool.js"
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
            var codeHtml =  `
            <ul class="Khoa">
              <div class="Ten-khoa">Khoa ${nameDepartment} <i class="fa-solid fa-caret-down icon-down"></i>
               <ul class="cac-nganh">
                  <li class="nganh">
                    <p class="ten-nganh">Toán</p>
                  </li>
                  <li class="nganh">
                    <p class="ten-nganh">Toán Tin</p>
                  </li>
                  <li class="nganh">
                    <p class="ten-nganh">KHMT</p>
                  </li>
                  <li class="nganh">
                    <p class="ten-nganh">KHDL</p>
                  </li>
                </ul>
              </div>
            </ul>`  
          const div = document.createElement("div")
          div.innerHTML = codeHtml
          container.appendChild(div)
        });
        // console.log(codeHtml);
      }
}

getAllDepartment()
