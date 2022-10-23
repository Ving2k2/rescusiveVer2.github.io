import getResearch from "../apiServices/research/getAllResearch.js"
import getUserById from "../apiServices/user/getUserById.js"
import getFileResearchbyId from "../apiServices/research/getFileResearchById.js"
import getAllComment from "../apiServices/research/getCommentResearch.js"
import getAlluserByType from "../apiServices/user/getAllUserByType.js"
import getAvatarUser from "../apiServices/user/getAvatarUser.js"
import getAllResearchByName from "../apiServices/research/getResearchByName.js"


async function getUser(id) {
    const user = await getUserById(id)
    if (user) {
        return user
    }
}

const getDataResearchSearch = async (name) => {
  const dataResearch = await getAllResearchByName(name)
  const dataPublic = []
  dataResearch.forEach(item => {
    if(item.idPublic) {
      dataPublic.push(item)
    }
  })
  if(dataPublic.length) {
    const container = document.querySelector(".box__research")
    container.innerHTML = null
         dataPublic.forEach(async(item, index) => {
            const idUser = item.idUser
            const user = await getUser(idUser)
            const fullName = `${user.firstName} ${user.lastName}`
            const nameResearch = item.name
            const descResearch = item.desc
            const avatar = await getAvatarUser("63497babfd3001fab0dde337")
            const fileResearch = await getFileResearchbyId(item._id)
            const codeHtml =  `<div class="viewer1 shadow-2xl float-left w-50 bg-slate-50 rounded-2xl mt-5 my-8">

            <div class="user1-status my-4">
              <div class="header-tus">
                <div class="avatar float-left mx-4">
                  <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                    src="${avatar? avatar :"/src/img/Avatar-Facebook-trắng.jpg"}" alt="Rounded avatar">
                </div>
                <div class="name-and-time float-left rounded-3xl pr-1 text-black">
                  <p class="name-user text-start font-semibold text-black">${fullName}</p>
                  <p class="text-black">9 giờ trước</p>
                </div>
                <div class="clear"></div>
              </div>
      
              <div class="caption text-start pt-4 px-6 text-xl">${nameResearch}</div>
              <div class="caption text-start pt-4 px-6 text-xl">${descResearch}</div>
            </div>
      
            <!-- <div class="time-and-school text-start text-gray-200 mb-8">
                  <p class="float-left my-1 text-gray-200 mx-2"><i class="fa-regular fa-clock"></i><a class ="text-gray-200 mx-2" href="">09/07/2022</a></p>
                  <p class="float-left my-1 text-gray-200 mx-2"><i class="fa-regular fa-comment"></i><a class ="text-gray-200 mx-2" href="#">0</a><p>
                  <div class="clear"></div>
              </div> -->
            <div class="clear"></div>
      
            <!--Begin View file -->
            <div class="view page">
              <iframe class="inline-flex max-w-full max-h-screen rounded-lg"
                src=${fileResearch} width="100%" height="600px"
                allow="autoplay" allowpaymentrequest></iframe>
            </div>

            <div class="reaction max-w-full mx-2 ">
              <div
                class="like-block float-left w-1/2 px-4 text-start hover:cursor-pointe hover:underline rounded-lg">

                <p class="text-black"><i class="fa-regular fa-thumbs-up my-2 mx-2"></i>5</p>
              </div>

              <div
                class="comment-block float-right w-1/2 px-4 text-end hover:cursor-pointe hover:underline rounded-lg">

                <p class="text-black">9 Comment</p>
              </div>
              <div class="clear"></div>
            </div>
      
            <div class="reaction max-w-full mx-2 mb-2 border-t-1 border-b-1 ">
              <div
                class="like-block float-left w-1/2 py-2 text-center hover:border-opacity-60 hover:cursor-pointer hover:bg-slate-500 rounded-lg">
      
                <p class="text-black"><i class="fa-regular fa-thumbs-up my-2 mx-2"></i>like</p>
              </div>
      
              <div
                class="comment-block float-left w-1/2 py-2 text-center hover:border-opacity-60 hover:cursor-pointer hover:bg-slate-500 rounded-lg">
      
                <p class="text-black"><i class="fa-regular fa-comment my-2 mx-2"></i>Comment</p>
              </div>
              <div class="clear"></div>
            </div>
      
      
            <div class="user-comments">
              <div class="user1-comment my-4">
                <div class="comment">
                  <div class="avatar float-left mx-4">
                    <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                      src="/src/img/Avatar-Facebook-trắng.jpg" alt="Rounded avatar">
                  </div>
                  <div class="content-comment float-left bg-slate-300 rounded-3xl px-6 py-1">
                    <p class="name-user text-start font-semibold">Nguyễn Văn B</p>
                    <p class="">Ôi!!! Mình tìm bài này mãi</p>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
      
              <div class="user2-comment my-4">
                <div class="comment">
                  <div class="avatar float-left mx-4">
                    <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                      src="/src/img/Avatar-Facebook-trắng.jpg" alt="Rounded avatar">
                  </div>
                  <div class="content-comment float-left bg-slate-300 rounded-3xl px-6 py-1">
                    <p class="name-user text-start font-semibold">Phạm Văn A</p>
                    <p class="">Đề này khó quá, ai có cách giải không ạ?</p>
                  </div>
                  <div class="clear"></div>
                </div>
              </div>
            </div>
      
            <div class="max-w-full mx- bg-transparent">
      
              <form>
                <label for="chat" class="sr-only">Comment</label>
                <div class="flex items-center py-2 px-3 bg-transparent rounded-lg border-solid border-l-zinc-500">
                  <button type="button"
                    class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <textarea id="Comment" rows="1"
                    class="block mx-4 p-2.5 w-full text-sm text-gray-800 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your comment..."></textarea>
                  <button type="submit"
                    class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 ">
                    <svg class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                      </path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
      
          </div>`
          const div = document.createElement("div")
          div.innerHTML = codeHtml
          container.appendChild(div)
          
        });
  } else {
    const container = document.querySelector(".box__research")
    container.innerHTML = null
  }
}


const elementSearchResearch = document.querySelector(".search__research")
elementSearchResearch.addEventListener("keyup", (e) => {
  const name = e.target.value
  console.log(name);
  if(name.trim()) {
    getDataResearchSearch(name)
  }
})

// const getAllCommentById = async (id) => {
//     const dataComment = await getAllComment(id)
//     var codeHtml = ""
//     if(dataComment) {
//         dataComment.forEach(async element => {
//             const idUser = element.idUserComment
//             const user = await getUser(idUser)
//             const fullName = `${user.firstName} ${user.lastName}`
//             codeHtml += `
//             <div class="user1-comment my-4">
//                 <div class="comment">
//                   <div class="avatar float-left mx-4">
//                     <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
//                       src="/src/img/Avatar-Facebook-trắng.jpg" alt="Rounded avatar">
//                   </div>
//                   <div class="content-comment float-left bg-slate-300 rounded-3xl px-6 py-1">
//                     <p class="name-user text-start font-semibold">${fullName}</p>
//                     <p class="">${element.comment}</p>
//                   </div>
//                   <div class="clear"></div>
//                 </div>
//               </div>`
//         });
//         console.log(codeHtml);
//         return codeHtml
//     }
// }


const getAllResearch = async () => {
  if(!elementSearchResearch.value) {
    const data = await getResearch()
    if(data) {
      const container = document.querySelector(".box__research")
      data.forEach(async(item, index) => {
         const idUser = item.idUser
         const user = await getUser(idUser)
         const fullName = `${user.firstName} ${user.lastName}`
         const nameResearch = item.name
         const descResearch = item.desc
         const avatar = await getAvatarUser("63497babfd3001fab0dde337")
         const fileResearch = await getFileResearchbyId(item._id)
         const codeHtml =  `<div class="viewer1 shadow-2xl float-left w-50 bg-slate-50 rounded-2xl mt-5 my-8">

         <div class="user1-status my-4">
           <div class="header-tus">
             <div class="avatar float-left mx-4">
               <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                 src="${avatar? avatar :"/src/img/Avatar-Facebook-trắng.jpg"}" alt="Rounded avatar">
             </div>
             <div class="name-and-time float-left rounded-3xl pr-1 text-black">
               <p class="name-user text-start font-semibold text-black">${fullName}</p>
               <p class="text-black">9 giờ trước</p>
             </div>
             <div class="clear"></div>
           </div>
   
           <div class="caption text-start pt-4 px-6 text-xl">${nameResearch}</div>
           <div class="caption text-start pt-4 px-6 text-xl">${descResearch}</div>
         </div>
   
         <!-- <div class="time-and-school text-start text-gray-200 mb-8">
               <p class="float-left my-1 text-gray-200 mx-2"><i class="fa-regular fa-clock"></i><a class ="text-gray-200 mx-2" href="">09/07/2022</a></p>
               <p class="float-left my-1 text-gray-200 mx-2"><i class="fa-regular fa-comment"></i><a class ="text-gray-200 mx-2" href="#">0</a><p>
               <div class="clear"></div>
           </div> -->
         <div class="clear"></div>
   
         <!--Begin View file -->
         <div class="view page">
           <iframe class="inline-flex max-w-full max-h-screen rounded-lg"
             src=${fileResearch} width="100%" height="600px"
             allow="autoplay" allowpaymentrequest></iframe>
         </div>

         <div class="reaction max-w-full mx-2 ">
           <div
             class="like-block float-left w-1/2 px-4 text-start hover:cursor-pointe hover:underline rounded-lg">

             <p class="text-black"><i class="fa-regular fa-thumbs-up my-2 mx-2"></i>5</p>
           </div>

           <div
             class="comment-block float-right w-1/2 px-4 text-end hover:cursor-pointe hover:underline rounded-lg">

             <p class="text-black">9 Comment</p>
           </div>
           <div class="clear"></div>
         </div>
   
         <div class="reaction max-w-full mx-2 mb-2 border-t-1 border-b-1 ">
           <div
             class="like-block float-left w-1/2 py-2 text-center hover:border-opacity-60 hover:cursor-pointer hover:bg-slate-500 rounded-lg">
   
             <p class="text-black"><i class="fa-regular fa-thumbs-up my-2 mx-2"></i>like</p>
           </div>
   
           <div
             class="comment-block float-left w-1/2 py-2 text-center hover:border-opacity-60 hover:cursor-pointer hover:bg-slate-500 rounded-lg">
   
             <p class="text-black"><i class="fa-regular fa-comment my-2 mx-2"></i>Comment</p>
           </div>
           <div class="clear"></div>
         </div>
   
   
         <div class="user-comments">
           <div class="user1-comment my-4">
             <div class="comment">
               <div class="avatar float-left mx-4">
                 <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                   src="/src/img/Avatar-Facebook-trắng.jpg" alt="Rounded avatar">
               </div>
               <div class="content-comment float-left bg-slate-300 rounded-3xl px-6 py-1">
                 <p class="name-user text-start font-semibold">Nguyễn Văn B</p>
                 <p class="">Ôi!!! Mình tìm bài này mãi</p>
               </div>
               <div class="clear"></div>
             </div>
           </div>
   
           <div class="user2-comment my-4">
             <div class="comment">
               <div class="avatar float-left mx-4">
                 <img class="buttonAvatar after-login w-12 h-12 hover:cursor-pointer rounded-full"
                   src="/src/img/Avatar-Facebook-trắng.jpg" alt="Rounded avatar">
               </div>
               <div class="content-comment float-left bg-slate-300 rounded-3xl px-6 py-1">
                 <p class="name-user text-start font-semibold">Phạm Văn A</p>
                 <p class="">Đề này khó quá, ai có cách giải không ạ?</p>
               </div>
               <div class="clear"></div>
             </div>
           </div>
         </div>
   
         <div class="max-w-full mx- bg-transparent">
   
           <form>
             <label for="chat" class="sr-only">Comment</label>
             <div class="flex items-center py-2 px-3 bg-transparent rounded-lg border-solid border-l-zinc-500">
               <button type="button"
                 class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd"
                     d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                     clip-rule="evenodd"></path>
                 </svg>
               </button>
               <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100">
                 <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                   <path fill-rule="evenodd"
                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                     clip-rule="evenodd"></path>
                 </svg>
               </button>
               <textarea id="Comment" rows="1"
                 class="block mx-4 p-2.5 w-full text-sm text-gray-800 bg-gray-200 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                 placeholder="Type your comment..."></textarea>
               <button type="submit"
                 class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 ">
                 <svg class="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                   <path
                     d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                   </path>
                 </svg>
               </button>
             </div>
           </form>
         </div>
   
       </div>`
       const div = document.createElement("div")
       div.innerHTML = codeHtml
       container.appendChild(div)
       
     });
    }
  }
}

getAllResearch()