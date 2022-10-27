import getResearch from "../apiServices/research/getAllResearch.js"
import getUserById from "../apiServices/user/getUserById.js"
import getFileResearchbyId from "../apiServices/research/getFileResearchById.js"
import getAllComment from "../apiServices/research/getCommentResearch.js"
import getAlluserByType from "../apiServices/user/getAllUserByType.js"
import getAvatarUser from "../apiServices/user/getAvatarUser.js"
import getAllResearchByName from "../apiServices/research/getResearchByName.js"
import {loaded,loading} from "./enviroment.js"

async function getUser(id) {
    loading()
    const user = await getUserById(id)
    if (user) {
        return user
    }
    loaded()
}

const getAllResearch = async () => {
    loading()
  const data = await getResearch()
  if(data) {
      const container = document.querySelector(".box__research")
       data.forEach(async(item, index) => {
          const decs = item.description
          const idUser = item.idUser
          const user = await getUserById(idUser)
          const fullName = `${user.firstName} ${user.lastName}`
          const nameResearch = item.name
          const date = item.createAt
          const avatar = await getAvatarUser(idUser)
          const file = await getFileResearchbyId(item._id);
          if (item.idPublic) {
          const codeHtml =  `
          <div class="card" id="post-id-1">
           <div class="card-body pb-1">
              <div class="media">
                  <img class="mr-2 rounded" src="${avatar ? avatar : "./assets/img/default.jpg"}"
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
                      <h5 class="m-0">${nameResearch}</h5>
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
                  <p class="show-more">Xem chi tiết...</p>
                  <br>
                  <p>${decs}</p>
                  <iframe class="w-100 mt-3" style="height: 75vh"
                          data-src="${file}">
                  </iframe>
              </div>
          </div>`
        const div = document.createElement("div")
        div.innerHTML = codeHtml;
        container.appendChild(div)}

        const showMore = document.querySelectorAll(".show-more")
        const postContent = document.querySelectorAll(".post-content")
        postContent.forEach((item, index) => {
            item.addEventListener("click", () => {
                if (showMore[index].innerHTML === "Xem chi tiết...") {
                    showMore[index].innerHTML = "Thu gọn"
                } else {
                    showMore[index].innerHTML = "Xem chi tiết..."
                }
            })
        })

      });
    }
  loaded()
}
getAllResearch()

$(document).on('click', '#buttonNCKH',(e)=>{
  let mainContent = document.querySelector("#main-content")
  mainContent.innerHTML = ''
  getAllResearch()
  const codeHtml = `
  <div id="for-homepage" class="row">
                        <div id="new-post" class="col-12">
                        </div>
                        <div id="news-feed" class="col-12">
                            <div class="box__research"></div>
                        </div>
<!--                        <div id="pagination" class="col-12">-->
<!--                            <div class="page-title-box"></div>-->
<!--                            <div class="page-title">-->
<!--                                <nav aria-label="Pagination">-->
<!--                                    <ul class="pagination pagination-md justify-content-center">-->
<!--                                        <li class="page-item disabled">-->
<!--                                            <a class="page-link" href="javascript: void(0);" tabindex="-1">-->
<!--                                                <i class="fa-solid fa-chevron-left"></i>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                        <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>-->
<!--                                        </li>-->
<!--                                        <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>-->
<!--                                        </li>-->
<!--                                        <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>-->
<!--                                        </li>-->
<!--                                        <li class="page-item">-->
<!--                                            <a class="page-link" href="javascript: void(0);">-->
<!--                                                <i class="fa-solid fa-chevron-right"></i>-->
<!--                                            </a>-->
<!--                                        </li>-->
<!--                                    </ul>-->
<!--                                </nav>-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>`
  mainContent.innerHTML = codeHtml;
})


