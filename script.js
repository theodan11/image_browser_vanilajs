let pageCount = 0
let AlbumData
let UserData

let likedImageList = []
// let user
const albumURL = 'https://jsonplaceholder.typicode.com/photos'
const userURL = "https://jsonplaceholder.typicode.com/users"
const nextBtn = document.getElementById("nextPage")
const prevPage = document.getElementById("prevPage")
const pageIndi = document.getElementById("pageCount")
const showBtn = document.getElementsByClassName("buttonContainer")[0]

let isLiked = false
const likedImage = document.getElementById("likedImage")
likedImage.addEventListener("click", ()=>{
    isLiked = true
    // renderElement(likedImageList.slice(pageCount, pageCount + 10))
    renderElement(likedImageList)
    
})

const allImage = document.getElementById("allImage")
allImage.addEventListener("click", ()=>{
    isLiked = false
    renderElement(AlbumData.slice(pageCount, pageCount + 10))
})


prevPage.addEventListener("click", () => {
    if (pageCount >= 10) {

        pageCount -= 10
        pageIndi.textContent = `${Math.round(pageCount / 10) + 1}`
        renderElement(AlbumData.slice(pageCount, pageCount + 10))
        // console.log(data.slice(pageCount, pageCount + 10))
    }
})

nextBtn.addEventListener("click", () => {
    if (Math.ceil(pageCount / 10) < 41) {
        // console.log(pageCount)

        pageCount += 10
        pageIndi.textContent = `${Math.ceil(pageCount / 10) + 1}`
        renderElement(AlbumData.slice(pageCount, pageCount + 10))
        console.log(AlbumData.slice(pageCount, pageCount + 10))
    }
})



const renderElement = (elements) => {
    let cardItem = document.getElementsByClassName("cardWrapper")[0]
    cardItem.innerHTML = ""
    console.log(elements["liked"])
    if(isLiked){
        elements  =  elements.filter((element)=> element["liked"] === true)
        showBtn.classList.add("showBtn")
    }else if(!isLiked){

        showBtn.classList.remove("showBtn")
    }
    elements.forEach(element => {
        // element["liked"] 
        let userId = UserData.filter((user) => element.albumId === user.id)[0]
        console.log("user", userId.name)
        // <img src='${element.url}'/>
        const card = document.createElement("div")
        card.className = "cardItem"
        card.innerHTML = `
        
            
            <img class="cardImage" src='https://picsum.photos/id/${element.id}/200/300'/>
            <div class="cardTitleAndUser">
                <h3 class="text-light ">${element.title.slice(0, 35)}</h3>
                <h4 class="text-primary">${userId.name}</h4>
            </div>
            <div class="likeContainer">
            ${element?.liked ?
                '<i class="bi bi-heart-fill"></i>'
                : '<i class="bi bi-heart"></i>'
            }</div>
      
            
    `

        cardItem.appendChild(card)
        const likeBtn = card.querySelector(".likeContainer")
        likeBtn.addEventListener("click", () => {
            console.log(`${element.id}`)
            let image = AlbumData.find(album => element.id === album.id)
            image["liked"] = !image["liked"]
           
            if (image["liked"]) {
                likedImageList.push(element)
                console.log("hello this is like list",likedImageList)
                const likeAlert = document.getElementsByClassName("likeAlert")[0]
                likeAlert.classList.toggle("showMe")
                setTimeout(() => {
                    likeAlert.classList.toggle("showMe")
                }, 1200);
                
            }else{


                const dislikeAlert = document.getElementsByClassName("dislikeAlert")[0]
                dislikeAlert.classList.toggle("showMe")
                setTimeout(() => {
                    dislikeAlert.classList.toggle("showMe")
                }, 1200);
                likedImageList =  likedImageList.filter((lkimg)=> lkimg.id !== element.id )
            }

            if(isLiked){
                renderElement(likedImageList)
            }else{

                renderElement(AlbumData.slice(pageCount, pageCount + 10))
            }
        })

    });


}



const fetchData = async () => {
    try {
        const albumResponse = await fetch(albumURL)
        const userResponse = await fetch(userURL)

        AlbumData = await albumResponse.json()
        UserData = await userResponse.json()


        console.log(UserData)
        console.log(AlbumData.slice(0, 10))
        renderElement(AlbumData.slice(0, 10))


    } catch (error) {
        alert(error.message)
    }
}





fetchData()









