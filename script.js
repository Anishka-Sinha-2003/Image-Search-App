const accessKey = "uZRZIwCCRtNVNlz9zx9wwgkf3LeUIuPkWmNy4yQgGQU"

const formElement = document.querySelector("form")
const inputElement = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const result = document.getElementById("showmore")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result) =>{
        const imageWrap = document.createElement('div');
        imageWrap.classList.add("result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrap.appendChild(image);
        imageWrap.appendChild(imageLink);
        searchResults.appendChild(imageWrap);
    });

    page++
    if(page > 1)
        {
            result.style.display = "block"
        }
}

formElement.addEventListener("submit" , (event) => {
    event.preventDefault()
    page = 1
    searchImages()
})

result.addEventListener("click" , () => {
    searchImages()
})
