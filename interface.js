//url for guardian politics headlines: 
//https://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=politics
document.addEventListener("DOMContentLoaded", () => {
  function createHeadlines(callback) {
      fetch("http://content.guardianapis.com/search?q=politics&show-fields=thumbnail&api-key=test")
      .then(response => response.json())
      .then(data => callback(data.response.results))
      .catch(error => console.error(error))
    }


  function displayHeadLines(){
    createHeadlines((results) => {
      for(let i = 0; i < results.length; i++) {
        let id = results[i].id
        let webTitle = results[i].webTitle
        let imgSrc = results[i].fields.thumbnail

        createImgElement(imgSrc)
        createLiElement(id, webTitle)
      }
    })
  }

  displayHeadLines()

  function createLiElement(id, webTitle) {
    li = document.createElement("li")
    li.innerHTML = `<a href="#${id}"> ${webTitle} </a><br>`
    document.querySelector("#headlines").append(li)
  }

function getSummary(webUrl, callback) {
     fetch(`http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=${webUrl}`)
    .then(response => response.json())
    .then(data => callback(data.sentences))
    .catch(error => console.error(error))
}


function createImgElement(imgSrc) {
  img = document.createElement("img")
  img.setAttribute("src", `${imgSrc}`)
  document.querySelector("#headlines").append(img)
}

window.addEventListener("hashchange", () => {
  document.querySelector("#headlines").innerHTML = ''
  let webUrl = `https://www.theguardian.com/${location.href.split("#")[1]}`
  getSummary(webUrl, (sentences) => {
    let summary = sentences.join(" ")
    document.querySelector("#summary").innerText = summary
  })

  document.querySelector("#back").addEventListener("click", () => {
    location.href = location.href.split("#")[0]
    document.querySelector("#summary").innerText = ''
    displayHeadLines()
  })
})
})