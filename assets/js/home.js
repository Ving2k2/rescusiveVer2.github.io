import getUserByID from "../apiServices/user/getUserById.js"
import { getCookie } from "../utils/libCookie.js"
import getAllResearch from "../apiServices/research/getAllResearch.js";
import getAllExam from "../apiServices/exam/getAllExam.js";
import getAllDepartment from "../apiServices/department/getAllDepartment.js"
// console.log(buttonAvatar);

// Sau khi đăng nhập từ quyền của mỗi người (admin, gv, sv) sẽ hiển thị ra ở thanh sidebar khác nhau
async function getUser() {
    const idUser = getCookie("idUser")
    const user = await getUserByID(idUser)

    const userName = document.getElementById("userName");
    const typeUser = document.getElementById("typeUser");
    // const avatar = await getAvatarUser(user._id);
    const buttonAdmin = document.querySelector("#buttonAdmin");
    const buttonGV = document.querySelector("#buttonGV");
    const buttonSV = document.querySelector("#buttonSV");
    buttonAdmin.style.display = "block !important";
    if (user) {
        userName.innerText = user.firstName + " " + user.lastName;
        let buttonRegister = document.getElementById("buttonRegister");
        let buttonLogin = document.getElementById("buttonLogin");
        buttonLogin.style.display = "none";
        buttonRegister.style.display = "none";
        if (user.isAdmin) {
            typeUser.innerText = "Admin";
            let codeHTML =
                `
                    <li class="side-nav-title side-nav-item">Trang admin</li>
                    <li class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-chalkboard-user"></i>
                            <span> Quản lý giáo viên </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-user"></i>
                            <span> Quản lý sinh viên </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa fa-diagram-project"></i>
                            <span> Quản lý đề tài </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa-solid fa-file-circle-question"></i>
                            <span> Quản lý đề thi </span>
                        </a>
                    </li>
                    <li class="side-nav-item item-link">
                        <a href="#" class="side-nav-link item-link">
                            <i class="fa-solid fa-school"></i>
                            <span> Quản lý khoa </span>
                        </a>
                    </li>
                `
            buttonAdmin.innerHTML = codeHTML;
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
            const buttonHuongDan1 = document.querySelector("#buttonThamGia1");
            let codeHTMLofChucNang = "";
            buttonCreateNCKH.onclick = function () {
                let boxCreateNCKH = document.querySelector("#for-createNCKH");
                // codeHTMLofChucNang = 
                // `
                //     <div class="col-12">
                //         <div class="page-title-box">
                //             <div class="page-title h4 text-dark">Tạo đề tài nghiên cứu khoa học</div>
                //         </div>
                //     </div>
                //     <div class="col-12">
                //         <div class="card">
                //             <div class="card-body">
                //                 <form>
                //                     <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                //                         <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên đề
                //                             tài:</label>
                //                         <input type="text" id="name-theme" class="underline-only">
                //                     </div>

                //                     <div class="pl-0 mx-1 h5">
                //                         <label for="summernote-basic" class="mb-2 font-weight-semibold text-dark">Tóm
                //                             tắt đề tài:</label>
                //                         <div id="summernote-basic"></div>
                //                     </div>
                //                     <div style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                //                         <input type="checkbox" name="" id="accept" class="">
                //                         <label for="accept" class="pl-1 mt-1 text-dark">Tôi đồng ý với điều
                //                             khoản</label>
                //                     </div>
                //                     <button class="btn btn-lg btn-outline-success">
                //                         <span>Đăng kí đề tài</span></button>
                //                 </form>
                //             </div>
                //         </div>
                //     </div>
                // `;
                // boxCreateNCKH.innerHTML = codeHTMLofChucNang;
                boxCreateNCKH.style.display = "block"
            }
            codeHTMLofChucNang = "";
            buttonHuongDan1.onclick = function () {
                let boxHuongDan = document.querySelector("#for-tham-gia-huong-dan");
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Đề tài tham gia nghiên cứu/hướng dẫn</div>
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
                                        Đề tài Demo
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                        With supporting text below as a natural lead-in to additional contenposuere erat
                                        a ante. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit
                                        magni similique? Tempore, quos delectus asperiores libero voluptas quod
                                        perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.
                                    </p>

                                    <p class="text-muted mb-2">
                                        Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni
                                        similique? Tempore, quos delectus asperiores libero voluptas quod perferendis!
                                        Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With supporting text
                                        below as a natural lead-in to additional contenposuere erat a ante.
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                       class="btn btn-link btn-lg text-muted">
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
                                             data-upload-preview-template="#uploadPreviewTemplate1">
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
                boxHuongDan.innerHTML = codeHTMLofChucNang;
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
                // codeHTMLofChucNang = 
                // `
                //     <div class="col-12">
                //         <div class="page-title-box">
                //             <div class="page-title h4 text-dark">Tạo đề tài nghiên cứu khoa học</div>
                //         </div>
                //     </div>
                //     <div class="col-12">
                //         <div class="card">
                //             <div class="card-body">
                //                 <form>
                //                     <div class="row h5" style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                //                         <label for="name-theme" class="font-weight-semibold text-dark mb-1 ">Tên đề
                //                             tài:</label>
                //                         <input type="text" id="name-theme" class="underline-only">
                //                     </div>

                //                     <div class="pl-0 mx-1 h5">
                //                         <label for="summernote-basic" class="mb-2 font-weight-semibold text-dark">Tóm
                //                             tắt đề tài:</label>
                //                         <div id="summernote-basic"></div>
                //                     </div>
                //                     <div style="margin-left: 0.4rem; margin-bottom: 0.5rem">
                //                         <input type="checkbox" name="" id="accept" class="">
                //                         <label for="accept" class="pl-1 mt-1 text-dark">Tôi đồng ý với điều
                //                             khoản</label>
                //                     </div>
                //                     <button class="btn btn-lg btn-outline-success">
                //                         <span>Đăng kí đề tài</span></button>
                //                 </form>
                //             </div>
                //         </div>
                //     </div>
                // `;
                // boxCreateNCKH.innerHTML = codeHTMLofChucNang;
                boxCreateNCKH.style.display = "block"
            }
            codeHTMLofChucNang = "";
            buttonHuongDan1.onclick = function () {
                let boxHuongDan = document.querySelector("#for-tham-gia-huong-dan");
                codeHTMLofChucNang = `
                    <div class="col-12">
                        <div class="page-title-box">
                            <div class="page-title h4 text-dark">Đề tài tham gia nghiên cứu/hướng dẫn</div>
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
                                        Đề tài Demo
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                        With supporting text below as a natural lead-in to additional contenposuere erat
                                        a ante. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit
                                        magni similique? Tempore, quos delectus asperiores libero voluptas quod
                                        perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.
                                    </p>

                                    <p class="text-muted mb-2">
                                        Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni
                                        similique? Tempore, quos delectus asperiores libero voluptas quod perferendis!
                                        Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With supporting text
                                        below as a natural lead-in to additional contenposuere erat a ante.
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#" download=""
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                       class="btn btn-link btn-lg text-muted">
                                                        <i class="fa-solid fa-download"></i>
                                                    </a>
                                                </div>
                                                <div class="col-auto">
                                                    <!-- Button -->
                                                    <a href="#"
                                                       class="btn btn-link btn-lg text-muted">
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
                                                       class="btn btn-link btn-lg text-muted">
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
                                             data-upload-preview-template="#uploadPreviewTemplate1">
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
                boxHuongDan.innerHTML = codeHTMLofChucNang;
            }
            codeHTMLofChucNang = "";
            buttonChamDiem1.onclick = function () {
                let boxChamDiem = document.querySelector("#for-cham-diem-de-tai");
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
                                        Đề tài Demo
                                    </h3>

                                    <h5>Tóm tắt đề tài:</h5>

                                    <p class="text-muted mb-2">
                                        With supporting text below as a natural lead-in to additional contenposuere erat
                                        a ante. Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit
                                        magni similique? Tempore, quos delectus asperiores libero voluptas quod
                                        perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet.
                                    </p>

                                    <p class="text-muted mb-2">
                                        Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni
                                        similique? Tempore, quos delectus asperiores libero voluptas quod perferendis!
                                        Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With supporting text
                                        below as a natural lead-in to additional contenposuere erat a ante.
                                    </p>
                                    <div class="row mt-2">
                                        <div class="col-6">
                                            <h5>Sinh viên nghiên cứu:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Michael Zenaty" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>

                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="James Anderson" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
                                                     class="rounded-circle img-thumbnail avatar-sm" alt="friend">
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <h5>Giảng viên hướng dẫn:</h5>
                                            <a href="javascript:void(0);" data-toggle="tooltip" data-placement="top"
                                               title=""
                                               data-original-title="Mat Helme" class="d-inline-block">
                                                <img src="./assets/img/Avatar-Facebook-trắng.jpg"
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
                                                    <a href="#" class="text-muted font-weight-bold">github.com</a>
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
                boxChamDiem.innerHTML = codeHTMLofChucNang
            }
        }
    }
}



getUser();


// async function getDataResearch () {
//     const data = await getAllResearch()
//     console.log(data);
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

