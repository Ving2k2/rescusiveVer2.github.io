import getUserByID from "../apiServices/user/getUserById.js"
import { getCookie } from "../utils/libCookie.js"
import getAvatarUser from "../apiServices/user/getAvatarUser.js";
import allUserByType from "../apiServices/user/getAllUserByType.js";
import deleteUser from "../apiServices/user/deleteUser.js";
import getAllResearchPrivate from "../apiServices/research/getAllResearchPrivate.js"
import getExam from "../apiServices/exam/getAllExam.js"
import getUserById from "../apiServices/user/getUserById.js";
import getDepartment from "../apiServices/department/getAllDepartment.js";
import getSubjectByIdDepartment from "../apiServices/subject/getSubjectByIdDepartment.js";
import getSubjectById from "../apiServices/subject/getSubjectById.js"
import getResearchById from "../apiServices/research/getResearchById.js"
import getDepartmentById from "../apiServices/department/getDepartmentById.js"
import deleteExam from "../apiServices/exam/deleteExam.js"
import {loaded,loading} from "./enviroment.js"
// console.log(buttonAvatar);

// Sau khi đăng nhập từ quyền của mỗi người (admin, gv, sv) sẽ hiển thị ra ở thanh sidebar khác nhau
async function getUser() {
    loading()
    const idUser = getCookie("idUser")
    if (idUser == '') {
        return;
    }
    const user = await getUserByID(idUser)
    console.log(user);
    const avatar = await getAvatarUser(idUser)

    // const avatar = await getAvatarUser(user._id);
    const buttonAdmin = document.querySelector("#buttonAdmin");
    const buttonGV = document.querySelector("#buttonGV");
    const buttonSV = document.querySelector("#buttonSV");
    const customPost = document.querySelector("#new-post");
    buttonAdmin.style.display = "block !important";
    if (user) {
        var type = ''
        if (user.isStudent)
            type = "Sinh viên"
        else if (user.isLecturers)
            type = "Giảng viên"
        else
            type = 'Admin'
        var userName = user.firstName + " " + user.lastName;
        let codeHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="media mt-2">
                        <img class="mr-3 avatar-sm rounded-circle"
                            src="${avatar ? avatar : "./assets/img/default.jpg"}"
                            alt="Generic placeholder image">
                        <div class="media-body">
                            <div class="btn-rounded h-100 p-2 h5 pl-4 mt-1"
                                style="background-color: rgba(210, 215, 219,0.35);" data-toggle="modal"
                                data-target="#new-post-modal">
                                Bạn muốn đăng bài? Nhấp vào đây!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="new-post-modal" class="modal fade" tabindex="-1" role="dialog"
                aria-labelledby="standard-modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title text-center">Đăng bài</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="${avatar ? avatar : "/src/img/default.jpg"}" alt="table-user"
                                class="avatar-sm mr-2 rounded-circle" height="50px">
                            <span class="h4 font-weight-semibold text-dark">${userName}</span>
                            <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên khoa:</label>
                                        <select id="name-department" class="underline-only"></select>
                            </div>
                            <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên môn:</label>
                                        <select id="name-subject" class="underline-only"></select>
                            </div>
                            <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên đề thi:</label>
                                        <input type="text" id="name-exam" class="underline-only">
                            </div>
                            <form action="">
            <textarea class="post-content-edit text-dark"
                    placeholder="${user.lastName} ơi, bạn có thể mô tả thêm về đề thi không?"></textarea>
                                <div class="edit-post-msc h4">
                                    <div class="row">
                                        <div class="col-8">
                                            Thêm vào bài viết của bạn:
                                        </div>

                                        <div class="col-4 d-flex flex-row-reverse align-content-between ">
                                            <div class="flex-grow-1" data-toggle="collapse"
                                                href="#dropzone" role="button" aria-expanded="false"
                                                aria-controls="dropzone"><i class="fa fa-image"></i>
                                            </div>
                                            <div class="flex-grow-1" data-toggle="collapse"
                                                href="#dropzone" role="button" aria-expanded="false"
                                                aria-controls="dropzone"><i class="fa fa-file"></i></div>
                                            <div class="flex-grow-1" data-toggle="collapse"
                                                href="#dropzone" role="button" aria-expanded="false"
                                                aria-controls="dropzone"><i class="fa fa-video"></i></div>
                                        </div>
                                    </div>

                                </div>
                                <div class="collapse w-100 mt-2 mb-0" id="dropzone">

                                    <div class="dropzone"
                                        id="myAwesomeDropzone"
                                        data-plugin="dropzone"
                                        data-previews-container="#file-previews"
                                        data-upload-preview-template="#uploadPreviewTemplate"
                                        data-url="/" data-maxFile="1">
                                        <div class="d-flex flex-row-reverse">
                                            <div data-toggle="collapse"
                                                href="#dropzone" role="button" aria-expanded="false"
                                                aria-controls="dropzone"><i
                                                    class="fa-solid fa-xmark"></i>
                                            </div>
                                        </div>
                                        <div class="fallback">
                                            <input name="file" id="file-input" type="file" multiple/>
                                        </div>

                                        <div class="dz-message needsclick">
                                            <i class="h1 text-muted fa-solid fa-cloud-arrow-up"></i>
                                            <h3>Kéo file hoặc click vào đây để tải lên.</h3>
                                        </div>
                                    </div>

                                    <!-- Preview -->
                                    <div class="dropzone-previews mt-3" id="file-previews"></div>

                                    <!-- file preview template -->
                                    <div class="d-none" id="uploadPreviewTemplate">
                                        <div class="card mt-1 mb-0 shadow-none border">
                                            <div class="p-2">
                                                <div class="row align-items-center">
                                                    <div class="col-auto">
                                                        <img data-dz-thumbnail src="#"
                                                            class="avatar-sm rounded bg-light" alt="">
                                                    </div>
                                                    <div class="col pl-0">
                                                        <a href="javascript:void(0);"
                                                        class="text-muted font-weight-bold"
                                                        data-dz-name></a>
                                                        <p class="mb-0" data-dz-size></p>
                                                    </div>
                                                    <div class="col-auto">
                                                        <!-- Button -->
                                                        <a href=""
                                                        class="btn btn-link btn-lg text-muted"
                                                        data-dz-remove>
                                                            <i class="fa-solid fa-xmark"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="buttonPostExam btn btn-primary w-100 h3">Đăng bài</button>
                        </div>
                    </div><!-- /.modal-content -->
                </div>
            </div>`;
        customPost.innerHTML = codeHTML;
        const selectDepartment = document.querySelector('#name-department');
        const data = await getDepartment();
        codeHTML = '';
        data.forEach((item) => {
            codeHTML += `<option value="${item._id}">${item.name}</option>`;
        })
        selectDepartment.innerHTML = codeHTML;
        const selectSubject = document.querySelector('#name-subject');
        selectDepartment.addEventListener('change', async (e) => {
            const data = await getSubjectByIdDepartment(e.target.value);
            codeHTML = '';
            data.forEach((item) => {
                codeHTML += `<option value="${item._id}">${item.name}</option>`;
            })
            selectSubject.innerHTML = codeHTML;
        })
        codeHTML = `<a class="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown" href="#"
                           role="button" aria-haspopup="false"
                           aria-expanded="false">
                                    <span class="account-user-avatar">
                                        <img id="user-avatar" src="${avatar ? avatar : "./assets/img/default.jpg"}" alt="user-image"
                                             class="rounded-circle img-fluid">
                                    </span>
                            <span>
                                        <span id="userName" class="account-user-name">${userName}</span>
                                        <span id="typeUser" class="account-position">${type}</span>
                                    </span>
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                            <!-- item-->
                            <div class=" dropdown-header noti-title">
                                <h6 class="text-overflow m-0">Chào mừng !</h6>
                            </div>

                            <!-- item-->
                            <a id = "buttonThongTinCaNhan" href="javascript:void(0);" class="dropdown-item notify-item">
                                <i class="fa fa-user-pen mr-1"></i>
                                <span>Thông tin cá nhân</span>
                            </a>

                            <!-- item-->
                            <a id="buttonLogout" href="javascript:void(0);" class="dropdown-item notify-item">
                                <i class="fa-solid fa-arrow-right-from-bracket mr-1"></i>
                                <span>Đăng xuất</span>
                            </a>

                        </div>`
        document.getElementById("blockUser").innerHTML = codeHTML;
        document.getElementById("buttonRegister").style.display = "none";
        document.getElementById("buttonLogin").style.display = "none";

        if (user.isAdmin) {
            typeUser.innerText = "Admin";
            let codeHTML =
                `
                    <li class="side-nav-title side-nav-item">Trang admin</li>
                    <li id = "buttonQLGV" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-chalkboard-user"></i>
                            <span> Quản lý giáo viên </span>
                        </a>
                    </li>
                    <li id="buttonQLSV" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-user"></i>
                            <span> Quản lý sinh viên </span>
                        </a>
                    </li>
                    <li id="buttonQLDeTai" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-diagram-project"></i>
                            <span> Quản lý đề tài </span>
                        </a>
                    </li>
                    <li id="buttonQLDeThi" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa-solid fa-file-circle-question"></i>
                            <span> Quản lý đề thi </span>
                        </a>
                    </li>
                `
            buttonAdmin.innerHTML = codeHTML;

            // render danh sách giảng viên
            async function renderLecturer() {
                const allLecturers = await allUserByType("lecturers");
                let codeHTMLofChucNang = ``;
                let bodyTableQLGV = document.querySelector("#table-body-qlgv");
                console.log(document.querySelector("#table-body-qlgv"));

                allLecturers.forEach(async (item, index) => {
                    const maSV = item.codeSudentOrLecturers;
                    const fullName = `${item.firstName} ${item.lastName}`;
                    // const typePeople = (item.isStudent) ? "Sinh viên" : "Giảng viên";

                    codeHTMLofChucNang += `
                        <tr id="row-qlgv-1">
                            <td class="table-id text-center">${++index}</td>
                            <td class="table-qlgv-msv">${maSV}</td>
                            <td class="table-qlgv-name">
                                <div class="d-flex flex-row">
                                    <div class="flex-grow-0 mr-2">
                                        <img class="img-fluid avatar-xs"
                                        src="./assets/img/default.jpg"
                                            alt="" />
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-semibold my-0">${fullName}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="table-qlgv-date">${++index}/10/2022</td>
                            <td class="table-qlgv-action">
                                <a href="javascript: void(0);" class="action-icon"> <i
                                        class="fa fa-light fa-pen"></i></a>
                                <a id ="buttonDelete" keyId = ${item._id} href="javascript: void(0);" class="action-icon delete__user"> <i
                                        class="fa fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    `;
                });
                bodyTableQLGV.innerHTML = codeHTMLofChucNang;
                const allButtonDelete = document.getElementsByClassName("delete__user");
                for (let i = 0; i < allButtonDelete.length; i++) {
                    const element = allButtonDelete[i];
                    element.addEventListener("click", async () => {
                        const statusDelete = await deleteUser(element.getAttribute("keyId"))
                        console.log(statusDelete);
                        renderLecturer()
                    })
                }
            }
            const buttonQLGV = document.querySelector("#buttonQLGV");
            buttonQLGV.onclick = function () {
                // document.getElementById("bang-quan-ly-gv").style.display = "block";
                let mainContent = document.querySelector("#main-content");
                renderLecturer();
                let codeHTMLofTable = `
                <div id="for-homepage" class="row">
                    <div class="col-12" id="bang-quan-ly-gv">
                        <div class="page-title-right" id="table-head-qlgv">
                            Quản lý giảng viên
                        </div>
                        <table class="table table-hover table-centered mb-0 table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã GV</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày tạo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="table-body-qlgv">
                                
                            </tbody>
                        </table>
                    </div>
                    </div>
<!--                    <div id="pagination" class="col-12">-->
<!--                        <div class="page-title-box"></div>-->
<!--                        <div class="page-title">-->
<!--                            <nav aria-label="Pagination">-->
<!--                                <ul class="pagination pagination-md justify-content-center">-->
<!--                                    <li class="page-item disabled">-->
<!--                                        <a class="page-link" href="javascript: void(0);" tabindex="-1">-->
<!--                                            <i class="fa-solid fa-chevron-left"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item">-->
<!--                                        <a class="page-link" href="javascript: void(0);">-->
<!--                                            <i class="fa-solid fa-chevron-right"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                            </nav>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                `;
                mainContent.innerHTML = codeHTMLofTable;

            }

            // render danh sách sinh viên
            async function renderStudent() {
                const allStudents = await allUserByType("student");
                let codeHTMLofChucNang = ``;
                let bodyTableQLSV = document.querySelector("#table-body-qlsv");
                console.log(document.querySelector("#table-body-qlsv"));

                allStudents.forEach(async (item, index) => {
                    const maSV = item.codeSudentOrLecturers;
                    const fullName = `${item.firstName} ${item.lastName}`;
                    // const typePeople = (item.isStudent) ? "Sinh viên" : "Giảng viên";

                    codeHTMLofChucNang += `
                        <tr id="row-qlgv-1">
                            <td class="table-id text-center">${++index}</td>
                            <td class="table-qlgv-msv">${maSV}</td>
                            <td class="table-qlgv-name">
                                <div class="d-flex flex-row">
                                    <div class="flex-grow-0 mr-2">
                                        <img class="img-fluid avatar-xs"
                                        src="./assets/img/default.jpg"
                                            alt="" />
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-semibold my-0">${fullName}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="table-qlgv-date">${30 - (index++)}/10/2022</td>
                            <td class="table-qlgv-action">
                                <a href="javascript: void(0);" class="action-icon"> <i
                                        class="fa fa-light fa-pen"></i></a>
                                <a id ="buttonDelete" keyId = ${item._id} href="javascript: void(0);" class="action-icon delete__user"> <i
                                        class="fa fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    `;
                });

                bodyTableQLSV.innerHTML = codeHTMLofChucNang;
                const allButtonDelete = document.getElementsByClassName("delete__user");
                for (let i = 0; i < allButtonDelete.length; i++) {
                    const element = allButtonDelete[i];
                    element.addEventListener("click", async () => {
                        const statusDelete = await deleteUser(element.getAttribute("keyId"))
                        console.log(statusDelete);
                        renderStudent()
                    })
                }
            }
            const buttonQLSV = document.querySelector("#buttonQLSV");
            buttonQLSV.onclick = function () {
                let mainContent = document.querySelector("#main-content");
                renderStudent();
                let codeHTMLofTable = `
                    <div id="for-homepage" class="row">
                    <div class="col-12" id="bang-quan-ly-sv">
                        <div class="page-title-right" id="table-head-qlsv">
                            Quản lý sinh viên
                        </div>
                        <table class="table table-hover table-centered mb-0 table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Mã SV</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày tạo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="table-body-qlsv">
                            </tbody>
                        </table>
                    </div>
                    
<!--                    <div id="pagination" class="col-12">-->
<!--                        <div class="page-title-box"></div>-->
<!--                        <div class="page-title">-->
<!--                            <nav aria-label="Pagination">-->
<!--                                <ul class="pagination pagination-md justify-content-center">-->
<!--                                    <li class="page-item disabled">-->
<!--                                        <a class="page-link" href="javascript: void(0);" tabindex="-1">-->
<!--                                            <i class="fa-solid fa-chevron-left"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item">-->
<!--                                        <a class="page-link" href="javascript: void(0);">-->
<!--                                            <i class="fa-solid fa-chevron-right"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                            </nav>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                `;
                mainContent.innerHTML = codeHTMLofTable;
            }

            // render bảng đề tài nghiên cứu khoa học
            async function renderDeTai() {
                const allDeTai = await getAllResearchPrivate();
                console.log(allDeTai);
                let codeHTMLofChucNang = '';
                let bodyTableDeTai = document.querySelector("#table-body-qldtai");
                console.log(bodyTableDeTai);
                allDeTai.forEach(async (item, index) => {
                    const tenDeTai = item.name;
                    // const avatar = await getAvatarUser(item.idUser);

                    codeHTMLofChucNang += `
                        <tr id="row-qldtai-1">
                            <td class="table-id text-center">${++index}</td>
                            <td class="table-qldtai-name">
                                <div class="text-center flex-row">
                                    <div class="flex-grow-0 mr-2"> </div>
                                    <div class="flex-1">
                                        <p class="font-semibold my-0">${tenDeTai}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="table-qldtai-status text-center">
                                <span class="badge badge-success-lighten badge-pill">Approved</span>
                            </td>
                            <td class="table-qldtai-sv text-center">

                                <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Mat Helme" class="d-inline-block">
                                    <img src="https://kenh14cdn.com/QuickNewsK14/4071215/2015/02/img_201502231923258226.jpg"
                                        alt="image" class="img-fluid avatar-xs rounded-circle">
                                </a>

                                <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Michael Zenaty" class="d-inline-block">
                                    <img src="https://kenh14cdn.com/QuickNewsK14/4071215/2015/02/img_201502231923258226.jpg"
                                        class="img-fluid avatar-xs rounded-circle" alt="friend">
                                </a>

                                <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="James Anderson" class="d-inline-block">
                                    <img src="https://kenh14cdn.com/QuickNewsK14/4071215/2015/02/img_201502231923258226.jpg"
                                        class="img-fluid avatar-xs rounded-circle" alt="friend">
                                </a>

                            </td>
                            <td class="table-qldtai-gv">

                                <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Mat Helme" class="d-inline-block">
                                    <img src="./assets/img/default.jpg"
                                        class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                </a>

                            </td>
                            <td class="table-qldtai-date">18/10/2022</td>
                            <td class="table-qldtai-action">
                                <a data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="Chỉnh sửa" 
                                href="javascript: void(0);" class="action-icon"> <i
                                        class="fa fa-light fa-pen"></i></a>
                                <a data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="Gỡ bỏ" 
                                href="javascript: void(0);" class="action-icon "> <i
                                        class="fa fa-solid fa-trash"></i></a>
                                <a data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="Phê duyệt"
                                href="javascript: void(0);" class="action-icon "> <i class="fa-solid fa-check"></i></a>
                            </td>
                        </tr>
                    `;
                });
                bodyTableDeTai.innerHTML = codeHTMLofChucNang;
            }

            const buttonQLDeTai = document.querySelector("#buttonQLDeTai");
            buttonQLDeTai.onclick = function () {
                let mainContent = document.querySelector("#main-content");
                renderDeTai();
                let codeHTMLofTable = `
                <div id="for-homepage" class="row">
                    <div class="col-12" id="bang-quan-ly-de-tai">
                        <div class="page-title-right" id="table-head-dtai">
                            Quản lý đề tài <a href="#" class="ml-1"><i class="fa fa-plus"></i></a>
                        </div>
                        <table class="table table-hover table-centered mb-0 table-responsive-lg">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên đề tài</th>
                                    <th>Tình trạng</th>
                                    <th>SV tham gia</th>
                                    <th>GV hướng dẫn</th>
                                    <th>Ngày tạo</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="table-body-qldtai">
                                
                            </tbody>
                        </table>
                    </div>
                    
<!--                    <div id="pagination" class="col-12">-->
<!--                        <div class="page-title-box"></div>-->
<!--                        <div class="page-title">-->
<!--                            <nav aria-label="Pagination">-->
<!--                                <ul class="pagination pagination-md justify-content-center">-->
<!--                                    <li class="page-item disabled">-->
<!--                                        <a class="page-link" href="javascript: void(0);" tabindex="-1">-->
<!--                                            <i class="fa-solid fa-chevron-left"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item">-->
<!--                                        <a class="page-link" href="javascript: void(0);">-->
<!--                                            <i class="fa-solid fa-chevron-right"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                            </nav>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                `;
                mainContent.innerHTML = codeHTMLofTable;
            }

            // render bảng quản lí đề thi
            async function renderDeThi() {
                const allDeThi = await getExam();
                console.log(allDeThi);
                let codeHTMLofChucNang = '';
                if (allDeThi) {
                    let bodyTableDeThi = document.getElementById("table-body-qldthi");
                    bodyTableDeThi.innerHTML = "";
                    console.log(bodyTableDeThi);
                    allDeThi.forEach(async (item, index) => {
                        const idUser = item.idUserPost
                        const user = await getUserById(idUser)
                        const fullName = `${user.firstName} ${user.lastName}`
                        const idDepartment = item.idDepartment;
                        const nameDepartment = await getDepartmentById(idDepartment);
                        const nameExam = item.name
                        const idSubject = item.idExamSubject
                        const nameSubject = await getSubjectById(idSubject);
                        const status = item.isPublic;
                        if (status == false) {

                            codeHTMLofChucNang = `
                                <tr id="row-qldthi-1">
                                    <a href="">
                                        <td class="table-qldthi-dethi ">
                                            <div class="text-center">
                                                <div class="flex-grow-0 mr-2"></div>
                                                <div class="flex-1">
                                                    <p class="font-semibold my-0">${nameExam}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </a>
                                    <td class="table-qldthi-khoa">
                                        <div class="text-center">
                                            <div class="flex-grow-0 mr-2"> </div>
                                            <div class="flex-1">
                                                <p class="font-semibold my-0">${nameDepartment.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="table-qldthi-mon">
                                        <div class="text-center">
                                            <div class="flex-grow-0 mr-2"> </div>
                                            <div class="flex-1">
                                                <p class="font-semibold my-0">${nameSubject.name}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="table-qldthi-sl text-center">1</td>
                                    <td class="table-qldthi-status">
                                        <span class="badge badge-success-lighten badge-pill ">Approved</span>
                                    </td>
                                    <td class="table-qldthi-nguoi-dang">
                                        <div class="d-flex flex-row">
                                            <div class="flex-grow-0 mr-2">
                                                <img class="img-fluid avatar-xs"
                                                    src="https://kenh14cdn.com/QuickNewsK14/4071215/2015/02/img_201502231923258226.jpg"
                                                    alt="" />
                                            </div>
                                            <div class="flex-1">
                                                <p class="font-semibold my-0">${fullName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="table-qldthi-date">08/10/2022</td>
                                    <td class="table-qldthi-action">
                                        <a data-toggle="tooltip" data-placement="top"
                                        title="" data-original-title="Chỉnh sửa" 
                                        href="javascript: void(0);" class="action-icon"> <i
                                                class="fa fa-light fa-pen"></i></a>
                                        <a id ="buttonDelete" keyId = ${item._id} data-toggle="tooltip" data-placement="top"
                                        title="" data-original-title="Gỡ bỏ" 
                                        href="javascript: void(0);" class="action-icon delete__user"> <i
                                                class="fa fa-solid fa-trash "></i></a>
                                        <a data-toggle="tooltip" data-placement="top"
                                        title="" data-original-title="Phê duyệt"
                                        href="javascript: void(0);" class="action-icon "> <i class="fa-solid fa-check"></i></a>
                                    </td>
                                </tr>
                            `;
                            // bodyTableDeThi.appendChild() = codeHTMLofChucNang;
                            // console.log(bodyTableDeThi);
                            const tr = document.createElement("tr")
                            tr.innerHTML = codeHTMLofChucNang;
                            bodyTableDeThi.appendChild(tr)
                            const lis = document.querySelectorAll(".delete__user")
                            console.log(lis);
                            lis.forEach((item, index) => {
                                item.addEventListener("click", async () => {
                                    sessionStorage.setItem("idDepartment", idDepartment[index])
                                    const statusDelete = await deleteExam(item.getAttribute("keyId"));
                                    console.log(statusDelete);
                                    renderDeThi();
                                })
                                // console.log(item);
                            })
                        }
                    });
                    // const allButtonDelete = document.getElementsByClassName("delete__user");
                    // console.log(allButtonDelete);

                    // const lis = document.querySelectorAll(".delete__user")
                    // console.log(lis);


                    for (let i = 0; i < allButtonDelete.length; i++) {
                        let element = allButtonDelete[i];
                        console.log(element.getAttribute("keyId"));
                        element.addEventListener("click", async () => {
                            const statusDelete = await deleteExam(element.getAttribute("keyId"))
                            console.log(statusDelete);
                            renderDeThi()
                        })
                    }
                }
            }
            const buttonQLDeThi = document.querySelector("#buttonQLDeThi");
            buttonQLDeThi.onclick = function () {
                let mainContent = document.querySelector("#main-content");
                renderDeThi();
                let codeHTMLofTable = `
                <div id="for-homepage" class="row">
                    <div class="col-12" id="bang-quan-ly-de-thi">
                        <div class="page-title-right" id="table-head-dthi">
                            Quản lý đề thi <a href="#" class="ml-1"><i class="fa fa-plus"></i></a>
                        </div>
                        <table class="table table-hover table-centered mb-0 table-responsive-lg">
                            <thead>
                                <tr>
                                    <th> </th>
                                    <th>Tên Đề thi</th>
                                    <th> </th>
                                    <th>Tên khoa</th>
                                    <th>Tên Môn</th>
                                    <th>Số lượng file</th>
                                    <th>Tình trạng</th>
                                    <th>Người đăng</th>
                                    <th>Ngày đăng</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="table-body-qldthi">
                                
                            </tbody>
                        </table>
                    </div>
                    
<!--                    <div id="pagination" class="col-12">-->
<!--                        <div class="page-title-box"></div>-->
<!--                        <div class="page-title">-->
<!--                            <nav aria-label="Pagination">-->
<!--                                <ul class="pagination pagination-md justify-content-center">-->
<!--                                    <li class="page-item disabled">-->
<!--                                        <a class="page-link" href="javascript: void(0);" tabindex="-1">-->
<!--                                            <i class="fa-solid fa-chevron-left"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">1</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a>-->
<!--                                    </li>-->
<!--                                    <li class="page-item">-->
<!--                                        <a class="page-link" href="javascript: void(0);">-->
<!--                                            <i class="fa-solid fa-chevron-right"></i>-->
<!--                                        </a>-->
<!--                                    </li>-->
<!--                                </ul>-->
<!--                            </nav>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                `;
                mainContent.innerHTML = codeHTMLofTable;
            }



        } else if (user.isStudent) {
            typeUser.innerText = "Sinh viên";
            let codeHTML = `
                    <li class="side-nav-title side-nav-item">Trang sinh viên</li>
                    <li id="buttonCreateNCKH" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-plus"></i>
                            <span> Tạo đề tài </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="javascript: void(0);" class="side-nav-link item-link">
                            <i class="fa-regular fa-pen-to-square"></i>
                            <span> Đề tài tham gia </span>
                            <span class="menu-arrow"></span>
                        </a>
                        <ul class="side-nav-second-level item-link" aria-expanded="false">
                            <li id = "buttonThamGia1" >
                                <a href="#" class="item-link">Đề tài 1</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 2</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 3</a>
                            </li>
                        </ul>
                    </li>
                `;
            buttonSV.innerHTML = codeHTML;

            const buttonCreateNCKH = document.querySelector("#buttonCreateNCKH");
            const buttonThamGia1 = document.querySelector("#buttonThamGia1");
            let codeHTMLofChucNang = "";
            buttonCreateNCKH.onclick = function () {
                let boxCreateNCKH = document.querySelector("#for-createNCKH");
                let mainContent = document.querySelector("#main-content")
                codeHTMLofChucNang = `
                <div id="for-createNCKH" class="row">
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Tạo đề tài nghiên cứu khoa học</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên đề
                                            tài:</label>
                                        <input type="text" id="name-theme" class="underline-only">
                                    </div>

                                    <div class="pl-0 mx-1 h5">
                                        <label for="summernote-create" class="mb-2 font-weight-semibold text-dark">Tóm
                                            tắt đề tài:</label>
                                        <div id="summernote-create" class="summernote"></div>
                                    </div>
                                    <div style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <input type="checkbox" name="" id="accept" class="">
                                        <label for="accept" class="pl-1 mt-1 text-dark">Tôi đồng ý với điều
                                            khoản</label>
                                    </div>
                                    <button class="btn btn-lg btn-outline-success">
                                        <span>Đăng kí đề tài</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                mainContent.innerHTML = codeHTMLofChucNang;
            }

            buttonThamGia1.onclick = function () {
                let boxHuongDan = document.querySelector("#for-tham-gia-huong-dan");
                let mainContent = document.querySelector("#main-content")
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Đề tài tham gia nghiên cứu</div>
                        </div>
                    </div>
                    <div id="edit-modal" class="modal fade" tabindex="-1" role="dialog"
                         aria-labelledby="edit-modalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-full-width">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="edit-modalLabel">Sửa đề tài</h4>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="row h5"
                                             style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                            <label for="edit-name-project"
                                                   class="font-weight-semibold text-dark mb-1 ">Tên đề tài:</label>
                                            <input type="text" id="edit-name-project" class="underline-only"
                                                   value="Đề tài Demo">
                                        </div>

                                        <div class="pl-0 mx-1 h5">
                                            <label for="summernote-basic-2"
                                                   class="mb-2 font-weight-semibold text-dark">Tóm tắt đề tài:</label>
                                            <div id="summernote-basic-2">
                                                <p class="text-muted mb-2">
                                                    With supporting text below as a natural lead-in to additional
                                                    contenposuere erat
                                                    a ante. Voluptates, illo, iste itaque voluptas corrupti ratione
                                                    reprehenderit
                                                    magni similique? Tempore, quos delectus asperiores libero voluptas
                                                    quod
                                                    perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.
                                                </p>

                                                <p class="text-muted mb-4">
                                                    Voluptates, illo, iste itaque voluptas corrupti ratione
                                                    reprehenderit magni
                                                    similique? Tempore, quos delectus asperiores libero voluptas quod
                                                    perferendis!
                                                    Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                                    supporting text
                                                    below as a natural lead-in to additional contenposuere erat a ante.
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light"
                                            data-dismiss="modal">Hủy lưu
                                    </button>
                                    <button type="button" class="btn btn-primary">Lưu
                                    </button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div>
                    <div class="row text-dark">
                        <div class="col-xl-8 col-lg-6">
                            <!-- project card -->
                            <div class="card d-block">
                                <div class="card-body">
                                    <div class="dropdown float-right">
                                        <a href="#" class="dropdown-toggle arrow-none card-drop" data-toggle="dropdown"
                                           aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <!--Giảng viên only-->
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <!-- item-->
                                            <a href="#edit-modal" class="dropdown-item" data-toggle="modal"
                                               data-target="#edit-modal"><i class="fa-solid fa-pencil mr-1"></i>Sửa</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i
                                                class="fa-solid fa-user-plus mr-1"></i>Thêm thành viên</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i
                                                class="fa-solid fa-user-minus mr-1"></i>Xóa thành viên</a>
                                        </div>
                                    </div>
                                    <!-- project title-->
                                    <h3 class="mt-0">
                                        Đề tài ứng dụng của thống kê vào website
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                    Với vai trò là người quản trị trang web thì việc thống kê lượt truy cập website là vô cùng cần thiết hơn cả.
                                     Không những thế, ngay cả đối với những người thường xuyên truy cập website hằng ngày, có bao giờ bạn tự hỏi rằng trang web này có bao nhiêu người truy cập mỗi ngày không.
                                    </p>

                                    <p class="text-muted mb-2">
                                    Nếu như bạn vẫn đang băn khoăn trong vấn đề làm thế nào để có thể thống kê lượt truy cập website hoặc đang
                                     muốn tìm hiểu xem có bao nhiêu người ghé thăm website này thì ở đây, tôi sẽ giới thiệu đến bạn những lợi
                                     ích của thống kê trong website và tầm quan trọng của nó như thế nào
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                    </div>

                                </div> <!-- end card-body-->

                            </div> <!-- end card-->

                            <div class="card">
                                <div class="card-body">
                                    <h4 class="mt-0 mb-3">Comments (2)</h4>

                                    <div class="media">
                                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                                             alt="Generic placeholder image" height="40px">
                                        <div class="media-body">
                                            <h5 class="m-0">Nguyễn Văn B </h5>

                                            <p class="my-1">Ôi!!! Mình tìm bài này mãi</p>

                                        </div> <!-- end media-body -->
                                    </div>
                                    <!-- binh luan 2-->
                                    <div class="media">
                                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                                             alt="Generic placeholder image" height="40px">
                                        <div class="media-body">
                                            <h5 class="m-0">Phạm Văn A</h5>

                                            <p class="my-1">Đề này khó quá, ai có cách giải không ạ?</p>

                                        </div> <!-- end media-body -->
                                    </div>
                                    <hr>
                                    <!-- binh luan se viet -->
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


                                    <div class="text-center mt-2">
                                        <a href="javascript:void(0);" class="text-danger">Load more </a>
                                    </div>
                                </div> <!-- end card-body-->
                            </div>
                            <!-- end card-->
                        </div> <!-- end col -->

                        <div class="col-lg-6 col-xl-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">Files</h5>
                                    <!-- compressed file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file-zipper"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.zip</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- image file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-image"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.img</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- video file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-video"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.mp4</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- document file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.pdf</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto">
                                                <!-- Button -->
                                                <a href="#" download=""
                                                   class="btn btn-link btn-lg text-muted px-1">
                                                    <i class="fa-solid fa-download"></i>
                                                </a>
                                                <a href="#"
                                                   class="btn btn-link btn-lg text-muted px-1">
                                                    <i class="fa-solid fa-trash-can"></i>
                                                </a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- link -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-link"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="#" class="text-muted font-weight-bold">github.com</a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end link -->
                                    <div class="card shadow-none border-0" id="dropzone-for-project">
                                        <div class="dropzone"
                                             id="myAwesomeDropzone1"
                                             data-plugin="dropzone"
                                             data-previews-container="#file-previews1"
                                             data-upload-preview-template="#uploadPreviewTemplate1" data-url="/">
                                            <div class="fallback">
                                                <input name="file" type="file" multiple/>
                                            </div>

                                            <div class="dz-message needsclick">
                                                <i class="h1 text-muted fa-solid fa-cloud-arrow-up"></i>
                                                <h3>Kéo file hoặc click vào đây để tải lên.</h3>
                                            </div>
                                        </div>
                                        <!-- Preview -->
                                        <div class="dropzone-previews mt-3" id="file-previews1"></div>
                                        <!-- file preview template -->
                                        <div class="d-none" id="uploadPreviewTemplate1">
                                            <div class="card mt-1 mb-0 shadow-none border">
                                                <div class="p-2">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <img data-dz-thumbnail src="#"
                                                                 class="avatar-sm rounded bg-light" alt="">
                                                        </div>
                                                        <div class="col pl-0">
                                                            <a href="javascript:void(0);"
                                                               class="text-muted font-weight-bold"
                                                               data-dz-name></a>
                                                            <p class="mb-0" data-dz-size></p>
                                                        </div>
                                                        <div class="col-auto">
                                                            <!-- Button -->
                                                            <a href=""
                                                               class="btn btn-link btn-lg text-muted"
                                                               data-dz-remove>
                                                                <i class="fa-solid fa-xmark"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-1 shadow-none border text-dark">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                mainContent.innerHTML = codeHTMLofChucNang;
            }


        } else {
            typeUser.innerText = "Giảng viên";
            let codeHTML = `
                <li class="side-nav-title side-nav-item">Trang giáo viên</li>
                    <li id="buttonCreateNCKH" class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-plus"></i>
                            <span> Tạo đề tài </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="javascript: void(0);" class="side-nav-link item-link">
                            <i class="fa-regular fa-pen-to-square"></i>
                            <span> Đề tài hướng dẫn </span>
                            <span class="menu-arrow"></span>
                        </a>
                        <ul class="side-nav-second-level item-link" aria-expanded="false">
                            <li id="buttonHuongDan1">
                                <a href="#" class="item-link">Đề tài 1</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 2</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 3</a>
                            </li>
                        </ul>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="javascript: void(0);" class="side-nav-link item-link">
                            <i class="fa-solid fa-file-signature"></i>
                            <span> Đề tài chấm điểm </span>
                            <span class="menu-arrow"></span>
                        </a>
                        <ul class="side-nav-second-level item-link" aria-expanded="false">
                            <li id="buttonChamDiem1">
                                <a href="#" class="item-link">Đề tài 1</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 2</a>
                            </li>
                            <li>
                                <a href="#" class="item-link">Đề tài 3</a>
                            </li>
                        </ul>
                    </li>
                `;
            buttonGV.innerHTML = codeHTML;

            const buttonCreateNCKH = document.querySelector("#buttonCreateNCKH");
            const buttonHuongDan1 = document.querySelector("#buttonHuongDan1");
            const buttonChamDiem1 = document.querySelector("#buttonChamDiem1");
            let codeHTMLofChucNang = "";
            buttonCreateNCKH.onclick = function () {
                let boxCreateNCKH = document.querySelector("#for-createNCKH");
                let mainContent = document.querySelector("#main-content")
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Tạo đề tài nghiên cứu khoa học</div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên đề
                                            tài:</label>
                                        <input type="text" id="name-theme" class="underline-only">
                                    </div>

                                    <div class="pl-0 mx-1 h5">
                                        <label for="summernote-create" class="mb-2 font-weight-semibold text-dark">Tóm
                                            tắt đề tài:</label>
                                        <div id="summernote-create" class="summernote"></div>
                                    </div>
                                    <div style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                        <input type="checkbox" name="" id="accept" class="">
                                        <label for="accept" class="pl-1 mt-1 text-dark">Tôi đồng ý với điều
                                            khoản</label>
                                    </div>
                                    <button class="btn btn-lg btn-outline-success">
                                        <span>Đăng kí đề tài</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
                mainContent.innerHTML = codeHTMLofChucNang;
            }
            codeHTMLofChucNang = "";
            buttonHuongDan1.onclick = function () {
                let boxHuongDan = document.querySelector("#for-tham-gia-huong-dan");
                let mainContent = document.querySelector("#main-content")
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Đề tài tham gia hướng dẫn</div>
                        </div>
                    </div>
                    <div id="edit-modal" class="modal fade" tabindex="-1" role="dialog"
                         aria-labelledby="edit-modalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-full-width">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title" id="edit-modalLabel">Sửa đề tài</h4>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-hidden="true">×
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="row h5"
                                             style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                            <label for="edit-name-project"
                                                   class="font-weight-semibold text-dark mb-1 ">Tên đề tài:</label>
                                            <input type="text" id="edit-name-project" class="underline-only"
                                                   value="Đề tài Demo">
                                        </div>

                                        <div class="pl-0 mx-1 h5">
                                            <label for="summernote-basic-2"
                                                   class="mb-2 font-weight-semibold text-dark">Tóm tắt đề tài:</label>
                                            <div id="summernote-basic-2">
                                                <p class="text-muted mb-2">
                                                    With supporting text below as a natural lead-in to additional
                                                    contenposuere erat
                                                    a ante. Voluptates, illo, iste itaque voluptas corrupti ratione
                                                    reprehenderit
                                                    magni similique? Tempore, quos delectus asperiores libero voluptas
                                                    quod
                                                    perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.
                                                </p>

                                                <p class="text-muted mb-4">
                                                    Voluptates, illo, iste itaque voluptas corrupti ratione
                                                    reprehenderit magni
                                                    similique? Tempore, quos delectus asperiores libero voluptas quod
                                                    perferendis!
                                                    Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                                    supporting text
                                                    below as a natural lead-in to additional contenposuere erat a ante.
                                                </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-light"
                                            data-dismiss="modal">Hủy lưu
                                    </button>
                                    <button type="button" class="btn btn-primary">Lưu
                                    </button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div>
                    <div class="row text-dark">
                        <div class="col-xl-8 col-lg-6">
                            <!-- project card -->
                            <div class="card d-block">
                                <div class="card-body">
                                    <div class="dropdown float-right">
                                        <a href="#" class="dropdown-toggle arrow-none card-drop" data-toggle="dropdown"
                                           aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <!--Giảng viên only-->
                                        <div class="dropdown-menu dropdown-menu-right">
                                            <!-- item-->
                                            <a href="#edit-modal" class="dropdown-item" data-toggle="modal"
                                               data-target="#edit-modal"><i class="fa-solid fa-pencil mr-1"></i>Sửa</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i
                                                class="fa-solid fa-user-plus mr-1"></i>Thêm thành viên</a>
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item"><i
                                                class="fa-solid fa-user-minus mr-1"></i>Xóa thành viên</a>
                                        </div>
                                    </div>
                                    <!-- project title-->
                                    <h3 class="mt-0">
                                        Đề tài ứng dụng của thống kê vào website
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                    Với vai trò là người quản trị trang web thì việc thống kê lượt truy cập website là vô cùng cần thiết hơn cả.
                                     Không những thế, ngay cả đối với những người thường xuyên truy cập website hằng ngày, có bao giờ bạn tự hỏi rằng trang web này có bao nhiêu người truy cập mỗi ngày không.
                                    </p>

                                    <p class="text-muted mb-2">
                                    Nếu như bạn vẫn đang băn khoăn trong vấn đề làm thế nào để có thể thống kê lượt truy cập website hoặc đang
                                     muốn tìm hiểu xem có bao nhiêu người ghé thăm website này thì ở đây, tôi sẽ giới thiệu đến bạn những lợi
                                     ích của thống kê trong website và tầm quan trọng của nó như thế nào
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                    </div>

                                </div> <!-- end card-body-->

                            </div> <!-- end card-->

                            <div class="card">
                                <div class="card-body">
                                    <h4 class="mt-0 mb-3">Comments (2)</h4>

                                    <div class="media">
                                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                                             alt="Generic placeholder image" height="40px">
                                        <div class="media-body">
                                            <h5 class="m-0">Nguyễn Văn B </h5>

                                            <p class="my-1">Ôi!!! Mình tìm bài này mãi</p>

                                        </div> <!-- end media-body -->
                                    </div>
                                    <!-- binh luan 2-->
                                    <div class="media">
                                        <img class="mr-2 rounded" src="./assets/img/logo-hus.png"
                                             alt="Generic placeholder image" height="40px">
                                        <div class="media-body">
                                            <h5 class="m-0">Phạm Văn A</h5>

                                            <p class="my-1">Đề này khó quá, ai có cách giải không ạ?</p>

                                        </div> <!-- end media-body -->
                                    </div>
                                    <hr>
                                    <!-- binh luan se viet -->
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


                                    <div class="text-center mt-2">
                                        <a href="javascript:void(0);" class="text-danger">Load more </a>
                                    </div>
                                </div> <!-- end card-body-->
                            </div>
                            <!-- end card-->
                        </div> <!-- end col -->

                        <div class="col-lg-6 col-xl-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">Files</h5>
                                    <!-- compressed file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file-zipper"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.zip</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- image file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-image"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.img</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- video file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-video"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.mp4</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- document file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.pdf</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto text-center">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- link -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-link"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="#" class="text-muted font-weight-bold">github.com</a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted px-1">
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end link -->
                                    <div class="card shadow-none border-0" id="dropzone-for-project">
                                        <div class="dropzone"
                                             id="myAwesomeDropzone1"
                                             data-plugin="dropzone"
                                             data-previews-container="#file-previews1"
                                             data-upload-preview-template="#uploadPreviewTemplate1" data-url="/">
                                            <div class="fallback">
                                                <input name="file" type="file" multiple/>
                                            </div>

                                            <div class="dz-message needsclick">
                                                <i class="h1 text-muted fa-solid fa-cloud-arrow-up"></i>
                                                <h3>Kéo file hoặc click vào đây để tải lên.</h3>
                                            </div>
                                        </div>
                                        <!-- Preview -->
                                        <div class="dropzone-previews mt-3" id="file-previews1"></div>
                                        <!-- file preview template -->
                                        <div class="d-none" id="uploadPreviewTemplate1">
                                            <div class="card mt-1 mb-0 shadow-none border">
                                                <div class="p-2">
                                                    <div class="row align-items-center">
                                                        <div class="col-auto">
                                                            <img data-dz-thumbnail src="#"
                                                                 class="avatar-sm rounded bg-light" alt="">
                                                        </div>
                                                        <div class="col pl-0">
                                                            <a href="javascript:void(0);"
                                                               class="text-muted font-weight-bold"
                                                               data-dz-name></a>
                                                            <p class="mb-0" data-dz-size></p>
                                                        </div>
                                                        <div class="col-auto">
                                                            <!-- Button -->
                                                            <a href=""
                                                               class="btn btn-link btn-lg text-muted"
                                                               data-dz-remove>
                                                                <i class="fa-solid fa-xmark"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card mb-1 shadow-none border text-dark">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                mainContent.innerHTML = codeHTMLofChucNang;
            }
            codeHTMLofChucNang = "";
            buttonChamDiem1.onclick = function () {
                let boxChamDiem = document.querySelector("#for-cham-diem-de-tai");
                let mainContent = document.querySelector("#main-content")
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Chấm điểm đề tài nghiên cứu khoa học</div>
                        </div>
                    </div>
                    <div class="row text-dark">
                        <div class="col-xl-8 col-lg-6">
                            <!-- project card -->
                            <div class="card d-block">
                                <div class="card-body">
                                    <!-- project title-->
                                    <h3 class="mt-0">
                                        Đề tài ứng dụng của thống kê vào website
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                    Với vai trò là người quản trị trang web thì việc thống kê lượt truy cập website là vô cùng cần thiết hơn cả.
                                     Không những thế, ngay cả đối với những người thường xuyên truy cập website hằng ngày, có bao giờ bạn tự hỏi rằng trang web này có bao nhiêu người truy cập mỗi ngày không.
                                    </p>

                                    <p class="text-muted mb-2">
                                    Nếu như bạn vẫn đang băn khoăn trong vấn đề làm thế nào để có thể thống kê lượt truy cập website hoặc đang
                                     muốn tìm hiểu xem có bao nhiêu người ghé thăm website này thì ở đây, tôi sẽ giới thiệu đến bạn những lợi
                                     ích của thống kê trong website và tầm quan trọng của nó như thế nào
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/default.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                    </div>

                                </div> <!-- end card-body-->

                            </div> <!-- end card-->

                            <div class="card">
                                <div class="card-header text-center h4">
                                    Đánh giá đề tài
                                </div>
                                <div class="card-body">
                                    <form>
                                        <div class="row h5 align-items-lg-center"
                                             style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                                            <label class="font-weight-semibold text-dark mt-2">Điểm:</label>
                                            <span
                                                class="input-group bootstrap-touchspin bootstrap-touchspin-injected ml-2"
                                                style="width:10rem">
                                                <input data-toggle="touchspin" value="5.0" type="text" data-step="0.25"
                                                       data-decimals="2" data-bts-max="10" data-bts-min="0"
                                                       class="form-control">
                                            </span>
                                        </div>

                                        <div class="pl-0 mx-1 h5">
                                            <label for="summernote-basic" class="mb-2 font-weight-semibold text-dark">
                                                Đánh giá đề tài:
                                            </label>
                                            <div id="summernote-basic-3"></div>
                                        </div>
                                        <button class="btn btn-lg btn-outline-success">
                                            <span>Chấm điểm</span>
                                        </button>
                                    </form>
                                </div> <!-- end media-->
                            </div> <!-- end card-body-->
                            <!-- end card-->
                        </div> <!-- end col -->

                        <div class="col-lg-6 col-xl-4">

                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title mb-3">Files</h5>
                                    <!-- compressed file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file-zipper"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.zip</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- image file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-image"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.img</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- video file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-video"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.mp4</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- document file -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-file"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="javascript:void(0);" class="text-muted font-weight-bold">Design.pdf</a>
                                                    <p class="mb-0">2.3 MB</p>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end file -->
                                    <!-- link -->
                                    <div class="card mb-1 shadow-none border">
                                        <div class="p-2">
                                            <div class="row align-items-center">
                                                <div class="col-auto">
                                                    <div class="avatar-sm">
                                                            <span class="avatar-title rounded h3">
                                                                <i class="fa-solid fa-link"></i>
                                                            </span>
                                                    </div>
                                                </div>
                                                <div class="col pl-0">
                                                    <a href="#" class="text-muted font-weight-bold px-1">github.com</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- end link -->
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                mainContent.innerHTML = codeHTMLofChucNang;
            }
        }

        // Thông tin cá nhân
        document.querySelector("#buttonThongTinCaNhan").onclick = function () {
            let mainContent = document.querySelector("#main-content")
            let codeHTMLThongTinCaNhan = `
                    <div id="thong-tin-ca-nhan" class="row">
                        <div class="col-12">
                            <div class="page-title-box">
                                <h4 class="page-title">Thông tin cá nhân</h4>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <!-- Profile -->
                            <div class="card">
                                <div class="card-body profile-user-box">
                                    <div class="row">
                                        <div class="col-sm-8">
                                            <div class="media">
                                                <span class="float-left m-2 mr-4"><img src="assets/img/default.jpg" style="height: 100px;" alt="" class="rounded-circle img-thumbnail"></span>
                                                <div class="media-body">

                                                    <h4 class="my-1">${userName}</h4>
                                                    <p class="font-13 text-muted">${type}</p>
                                                    <h5>Mã ${type}: ${user.codeSudentOrLecturers}</h5>
                                                    <h5>Email: ${user.email}</h5>

                                                    <ul class="mb-0 list-inline">
                                                        <li class="list-inline-item mr-3">
                                                            <h5 class="mb-1">1</h5>
                                                            <p class="mb-0 font-13">Số đề tài đã tham gia/hướng dẫn</p>
                                                        </li>
                                                        <!-- Giao vien only-->
                                                        <li class="list-inline-item">
                                                            <h5 class="mb-1">1</h5>
                                                            <p class="mb-0 font-13">Số đề tài chấm điểm</p>
                                                        </li>
                                                        <li class="list-inline-item">
                                                            <h5 class="mb-1">1</h5>
                                                            <p class="mb-0 font-13">Số bài đã đăng</p>
                                                        </li>
                                                    </ul>
                                                </div> <!-- end media-body-->
                                            </div>
                                        </div> <!-- end col-->

                                        <div class="col-sm-4">
                                            <div class="text-center mt-sm-0 mt-3 text-sm-right">
                                                <button type="button" class="btn btn-light">
                                                    <i class="fa-solid fa-pen-to-square mr-1"></i>Sửa thông tin
                                                </button>
                                            </div>
                                        </div> <!-- end col-->
                                    </div> <!-- end row -->

                                </div> <!-- end card-body/ profile-user-box-->
                            </div><!--end profile/ card -->
                        </div>
                    </div>
            `;
            mainContent.innerHTML = codeHTMLThongTinCaNhan;
        }
    }
    loaded()
}


getUser();


// async function getDataResearch () {
//      const data = await getAllResearch()
//      console.log(data);
// }

// getDataResearch()

//  async function getDataExam () {
//      const data = await getAllExam()
//      console.log(data);
//  }
// getDataExam()

//  async function getDataDepartment () {
//      const data = await getAllDepartment()
//      console.log(data);
//  }

// getDataDepartment()

