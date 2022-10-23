import getExam from "../apiServices/exam/getAllExam.js";
import getImgSchool from "../apiServices/subject/getImgSchool.js";
import getUserById from "../apiServices/user/getUserById.js";
import getFileExam from "../apiServices/exam/getFileExam.js";

async function getUser(id) {
    const user = await getUserById(id)
    if (user) {
        return user
    }
}
console.log("dsgfjsdg");

// const getDataExamSearch = async () => {
//   const elementSearchExan = document.querySelector(".search__exam")
//   const textSearch = elementSearchExan.value;
//   const dataExan = await getExamByName(textSearch)
//   const dataPublic = []
//   dataExan.forEach(item => {
//     if(item.idPublic) {
//       dataPublic.push(item)
//     }
//   })
//   console.log(dataPublic);
// }

// const elementSearchExan = document.querySelector(".search__exam")
// console.log(elementSearchExan);
// elementSearchExan.addEventListener("keyup", () => console.log("djgfdjg"))

const getAllExam = async () => {
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
            const exam = getFileExam(item._id)
            const idSubject = item.idExamSubject
            const imgSchool = await getImgSchool(idSubject)
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
                    <iframe class="w-100 mt-3" style="height: 50vh"
                            data-src="${exam}">
                    </iframe>
                </div>
                <hr class="m-0">

                <div class="m-0 row">
                    <a href="javascript: void(0);"
                       class="like-button col-6 text-center btn btn-sm btn-link pl-0"
                       data-id="1">
                        <i class="fa-regular fa-thumbs-up"></i> 2 Lượt thích
                    </a>

                    <a class="comment-button col-6 text-center btn btn-sm btn-link"
                       data-toggle="collapse" href="#comment-id-1"
                       aria-expanded="true" aria-controls="comment-id-1">
                        <i class="fa-solid fa-comment"></i> 2 Bình luận
                    </a>

                </div>

                <hr class="m-0">

                <div class="mt-3 collapse" id="comment-id-1">
                    <div class="media">
                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                             alt="Generic placeholder image" height="40px">
                        <div class="media-body">
                            <h5 class="m-0">Nguyễn Văn B </h5>

                            <p class="my-1">Ôi!!! Mình tìm bài này mãi</p>

                        </div> <!-- end media-body -->
                    </div>
                    <div class="media">
                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                             alt="Generic placeholder image" height="40px">
                        <div class="media-body">
                            <h5 class="m-0">Phạm Văn A</h5>

                            <p class="my-1">Đề này khó quá, ai có cách giải không ạ?</p>

                        </div> <!-- end media-body -->
                    </div> <!-- end media-->

                    <hr>

                    <div class="media mb-2">
                        <img src="./assets/img/logo-hus.png" height="40px"
                             class="align-self-start rounded mr-2" alt="Arya Stark">
                        <form class="media-body mt-1 d-flex flex-row" data-id="1">
                            <input type="text" class="form-control border-0 form-control-sm flex-grow-1"
                                   placeholder="Write a comment">
                            <button class="border-0 bg-white text-info ml-1" type="submit">
                                <i class="fa-regular fa-paper-plane text-22"></i>
                            </button>
                        </form> <!-- end medi-body -->
                    </div> <!-- end media-->

                </div>
            </div> <!-- end card-body -->

        </div>`
          const div = document.createElement("div")
          div.innerHTML = codeHtml
          container.appendChild(div)
            }
        });
        // console.log(codeHtml);
      }
}

getAllExam()