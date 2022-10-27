import getImgSchool from "../apiServices/subject/getImgSchool.js";
import getUserById from "../apiServices/user/getUserById.js";
import getFileExam from "../apiServices/exam/getFileExam.js";
import getAllExamByName from "../apiServices/exam/getExamByName.js";
import getExamBy2Id from "../apiServices/exam/getExamBy2Id.js";
import getExamById from "../apiServices/exam/getExamById.js";
import getAllResearchByName from "../apiServices/research/getResearchByName.js";
import getAvatarUser from "../apiServices/user/getAvatarUser.js";
import getResearchById from "../apiServices/research/getResearchById.js";
import getFileResearchById from "../apiServices/research/getFileResearchById.js";   

window.addEventListener("load" , () => {
    sessionStorage.clear("idDeapartment")
    sessionStorage.clear("idSubject")
    sessionStorage.clear("idExam")
    sessionStorage.clear("idResearch")
})

const result = document.querySelector("#search-dropdown");
result.addEventListener("click", () => {
    const idExam = sessionStorage.getItem("idExam")
    const idResearch = sessionStorage.getItem("idResearch")
    if(idResearch) {
        sessionStorage.clear("idExam")
        getDataResearchById(idResearch)
        let mainContent = document.querySelector("#main-content")
        mainContent.innerHTML = ''
       const codeHtml = `
       <div id="for-homepage" class="row">
                        <div id="new-post" class="col-12">
                        </div>
                        <div id="news-feed" class="col-12">
                            <div class="box__research"></div>
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
                    </div>`
        mainContent.innerHTML = codeHtml;

    }
    if(idExam) {
        sessionStorage.clear("idResearch")
        getDataExamById(idExam)
        let mainContent = document.querySelector("#main-content")
        mainContent.innerHTML = ''
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
                    </div>`
        mainContent.innerHTML = codeHtml;
    }
})

const getDataSearch = async (name) => {
    result.innerHTML = "";
    const dataExam = await getAllExamByName(name)
    const dataResearch = await getAllResearchByName(name)
    const dataExamPublic = []
    const dataResearchPublic = []
    var idExam = []
    var idResearch = []

    dataExam.forEach(item => {
      if(item.isPublic) {
        dataExamPublic.push(item)
      }
    })

    dataResearch.forEach(item => {
        if(item.idPublic) {
            dataResearchPublic.push(item)
        }
    })

    var codeHtml =`<div class="dropdown-header noti-title">
    <h5 class="text-overflow mb-2">Tìm thấy <span class="text-danger">${dataResearchPublic.length + dataExamPublic.length}</span> kết quả</h5>
    </div>
    `
    if (dataExamPublic.length) {
            codeHtml +=  `
            <!-- item-->
                        <div class="dropdown-header noti-title">
                            <h6 class="text-overflow mb-2 text-uppercase">Đề thi</h6>
                        </div>
                        <div class="notification-list">`
            result.innerHTML = codeHtml
            dataExamPublic.forEach(async(item, index) => {
            idExam.push(item._id)
            const idUser = item.idUserPost
            const user = await getUserById(idUser)
            const fullName = `${user.firstName} ${user.lastName}`
            const nameExam = item.name
            const idSubject = item.idExamSubject
            const imgSubject = await getImgSchool(idSubject)
            codeHtml +=
                   ` <!-- item-->
                            <a href="javascript:void(0);" class="dropdown-item notify-item mb-1 search-item search-item-exam" data-id="postid">
                                <div class="media">
                                    <img class="d-flex mr-2 rounded-circle" src="${imgSubject ? imgSubject : "./assets/img/logo-hus.png"}" alt="Generic placeholder image" height="32">
                                    <div class="media-body">
                                        <h5 class="m-0 font-14">${fullName}</h5>
                                        <span class="font-12 mb-0">
                                            ${nameExam}
                                        </span>
                                    </div>
                                </div>
                            </a>
                        `
            result.innerHTML = codeHtml
            const list = document.querySelectorAll(".search-item-exam")
            list.forEach((item,index) => {
                item.addEventListener("click", async() => {
                    sessionStorage.setItem("idExam", idExam[index])
                })
            })
         });
            codeHtml += `</div>`            
    }
 
    if (dataResearchPublic.length) {
        codeHtml +=  `
        <!-- item-->
                    <div class="dropdown-header noti-title">
                        <h6 class="text-overflow mb-2 text-uppercase">Nghiên cứu khoa học</h6>
                    </div>
                    <div class="notification-list">`
        result.innerHTML = codeHtml
        dataResearchPublic.forEach(async(item, index) => {
        idResearch.push(item._id)
        const idUser = item.idUser
        const user = await getUserById(idUser)
        const fullName = `${user.firstName} ${user.lastName}`
        const nameResearch= item.name
        const avatar = await getAvatarUser(idUser)
        codeHtml +=
               ` <!-- item-->
                        <a href="javascript:void(0);" class="dropdown-item notify-item mb-1 search-item search-item-research" data-id="postid">
                            <div class="media">
                                <img class="d-flex mr-2 rounded-circle" src="${avatar ? avatar : "./assets/img/default.jpg"}" alt="Generic placeholder image" height="32">
                                <div class="media-body">
                                    <h5 class="m-0 font-14">${fullName}</h5>
                                    <span class="font-12 mb-0">
                                        ${nameResearch}
                                    </span>
                                </div>
                            </div>
                        </a>
                    `
        result.innerHTML = codeHtml
        const list = document.querySelectorAll(".search-item-research")
        list.forEach((item,index) => {
            item.addEventListener("click", async() => {
                sessionStorage.setItem("idResearch", idResearch[index])
            })
        })
     });
        codeHtml += `</div>`        
}
    result.innerHTML = codeHtml

}

const elementSearchExam = document.querySelector("#top-search")
const btnSearch = document.querySelector("#btn-search")
btnSearch.addEventListener("click", (e) => {
    e.preventDefault()
    const name = elementSearchExam.value
    getDataSearch(name)
})
elementSearchExam.onkeydown=elementSearchExam.onkeyup=function () {
      if(elementSearchExam.value.length > 2) {
           getDataSearch(elementSearchExam.value)
}}

const getDataExamById = async (idExam) => {
    const dataExam = await getExamById(idExam)
    const dataPublic = []
    if(dataExam.isPublic) {dataPublic.push(dataExam)}
    var codeHtml = ``
    if (dataPublic.length) {
        const container = document.querySelector(".box__exam")
        container.innerHTML = null
        dataPublic.forEach(async(item, index) => {
            const idUser = item.idUserPost
            const user = await getUserById(idUser)
            const fullName = `${user.firstName} ${user.lastName}`
            const nameExam = item.name
            const date = item.createAt
            const idSubject = item.idExamSubject
            const imgSchool = await getImgSchool(idSubject)
            const fileExam = await getFileExam(item._id)
            codeHtml += `
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
                    <p class="show-more">Xem chi tiết...</p>
                    <br>
                    <iframe class="w-100 mt-3" style="height: 75vh"
                            data-src="${fileExam}">
                    </iframe>
                </div>
            </div>`
          const div = document.createElement("div")
          div.innerHTML = codeHtml;
          container.appendChild(div)
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
        })
     }
}

const getDataResearchById = async (idResearch) => {
    const dataResearch = await getResearchById(idResearch)
    console.log(dataResearch)
    const dataPublic = []
    if(dataResearch.idPublic) {dataPublic.push(dataResearch)}
    var codeHtml = ``
    if (dataPublic.length) {
        const container = document.querySelector(".box__research")
        container.innerHTML = null
        dataPublic.forEach(async(item, index) => {
            const idUser = item.idUser
            const user = await getUserById(idUser)
            const fullName = `${user.firstName} ${user.lastName}`
            const nameResearch = item.name
            const decs = item.description
            const date = item.createAt
            const avatar = await getAvatarUser(idUser)
            const file = await getFileResearchById(item._id);
            codeHtml += `
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
        container.appendChild(div)

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

        })
     } 
}

const getDataExamBy2Id = async (idDepartment, idSubject) => {
     const dataExam = await getExamBy2Id(idDepartment, idSubject)
     const dataPublic = []
     dataExam.forEach(item => {
         if(item.isPublic) {
             dataPublic.push(item)
         }
     })
     if (dataPublic.length) {
         const container = document.querySelector(".box__exam")
         container.innerHTML = null
         dataPublic.forEach(async(item, index) => {
             const idUser = item.idUserPost
             const user = await getUserById(idUser)
             const fullName = `${user.firstName} ${user.lastName}`
             const nameExam = item.name
             const date = item.createAt
             const idSubject = item.idExamSubject
             const imgSchool = await getImgSchool(idSubject)
             const fileExam = await getFileExam(item._id)
             let codeHtml = `
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
                    <p class="show-more">Xem chi tiết...</p>
                    <br>
                    <iframe class="w-100 mt-3" style="height: 75vh"
                            data-src="${fileExam}">
                    </iframe>
                </div>
            </div>`
          const div = document.createElement("div")
          div.innerHTML = codeHtml;
          container.appendChild(div)
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
         })
      } else {
        sessionStorage.setItem("idSubject", null)
        const container = document.querySelector(".box__exam")
        container.innerHTML = ""
        const codehtml = ` <div>Không có kết quả nào</div>`
        const div = document.createElement("div")
         div.innerHTML = codehtml
         container.appendChild(div)
    }

 }

const searchOnClick = document.querySelector(".search-on-click")
searchOnClick.addEventListener("click" , () => {
     const idOfDepartment = sessionStorage.getItem("idDepartment")
     const idOfSubject = sessionStorage.getItem("idSubject")
     if (idOfDepartment != null && idOfSubject != null) {
     getDataExamBy2Id(idOfDepartment , idOfSubject)
     let mainContent = document.querySelector("#main-content")
        mainContent.innerHTML = ''
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
                    </div>`
        mainContent.innerHTML = codeHtml;
     }
 })