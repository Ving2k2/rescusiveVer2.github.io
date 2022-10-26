import getExam from "../apiServices/exam/getAllExam.js";
import getImgSchool from "../apiServices/subject/getImgSchool.js";
import getUserById from "../apiServices/user/getUserById.js";
import getFileExam from "../apiServices/exam/getFileExam.js";
import getAllExamByName from "../apiServices/exam/getExamByName.js";
import getExamBy2Id from "../apiServices/exam/getExamBy2Id.js";
import getExamById from "../apiServices/exam/getExamById.js";

const getAllExam = async () => {
    if (sessionStorage.getItem("idDepartment") == null || sessionStorage.getItem("idSubject") == null || sessionStorage.getItem("idSubject") == "null") {
    const data = await getExam()
    if(data) {
        const container = document.querySelector(".box__exam")
        // var codeHtml = "";
         data.forEach(async(item, index) => {
            const idUser = item.idUserPost
            const user = await getUserById(idUser)
            const fullName = `${user.firstName} ${user.lastName}`
            const nameExam = item.name
            const date = item.createAt
            const idSubject = item.idExamSubject
            const imgSchool = await getImgSchool(idSubject)
            const fileExam = await getFileExam(item._id)
            const status = item.isPublic
            if (status == true) {
            const codeHtml =  `
            <div class="card" id="post-id-1">
             <div class="card-body pb-1">
                <div class="media">
                    <img class="mr-2 rounded" src="${imgSchool ? imgSchool : "./assets/img/logo-hus.png"}"
                         alt="Generic placeholder image" height="32">
                    <div class="media-body">
                        <div class="dropdown float-right text-muted">
                            <a href="#" class="dropdown-toggle arrow-none card-drop"
                               data-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <!-- item-->
                                <a href="javascript:void(0);" data-id="1" class="dropdown-item">Sửa</a>
                                <!-- item-->
                                <a href="javascript:void(0);" data-id="1" class="dropdown-item">Xóa</a>
                            </div>
                        </div>
                        <h5 class="m-0">${nameExam}</h5>
                        <p class="text-muted">
                            <small>
                                <i class="fa-regular fa-clock pr-1"></i> ${date}
                                <span class="mx-2">⚬</span>
                                <i class="fa-regular fa-user pr-1"></i>
                                <a class="mr-2" href="#">Người đăng: ${fullName}</a>
                            </small>
                        </p>
                    </div>
                </div>

                <hr class="m-0">
                <div class="post-content">
                    Đề thi và đáp án tham khảo môn Giải Tích 1 kỳ 2 năm học 2021-2022
                    <br>
                    <iframe class="w-100 mt-3" style="height: 75vh"
                            data-src="${fileExam}">
                    </iframe>
                </div>
            </div>`
          const div = document.createElement("div")
          div.innerHTML = codeHtml;
          container.appendChild(div)
            }
        });
      }
    }
}
getAllExam()

// $(document).on('click', '#buttonDeThi',(e)=>{
//     document.querySelector(".box__exam").innerHTML = '';
//     getAllExam()})

$(document).on('click', '#buttonDeThi',(e)=>{
    let mainContent = document.querySelector("#main-content")
    mainContent.innerHTML = ''
    getAllExam()
    const codeHtml = `
        <div id="for-homepage" class="row">
            <div id="new-post" class="col-12">
            </div>
            <div id="news-feed" class="col-12">
                <div class="box__exam"></div>
            </div>
            <div id="pagination" class="col-12">
                <div class="page-title-box"></div>
                <div class="page-title">
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-md justify-content-center">
                            <li class="page-item disabled">
                                <a class="page-link" href="javascript: void(0);" tabindex="-1">
                                    <i class="fa-solid fa-chevron-left"></i>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>
                            </li>
                            <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="javascript: void(0);">
                                    <i class="fa-solid fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `
    mainContent.innerHTML = codeHtml;
    console.log(mainContent)
})