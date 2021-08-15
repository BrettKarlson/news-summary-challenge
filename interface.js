//url for guardian politics headlines: 
//https://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=politics
function createHeadlines() {
  fetch('https://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=politics')
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      let newsContainer = document.getElementById('newsTitle');
      let newsArray = data.response.results
      console.log(newsArray);
      for(let i = 0; i < newsArray.length; i++) {
        let newsStory = `<a class='title' data-newsID="${i}" href="${newsArray[i].webUrl}">${newsArray[i].webTitle}</a></br>`
        newsContainer.innerHTML += newsStory
      }
    })
    .catch(error => console.error(error));
}
createHeadlines();

function getSummary(webUrl, callback) {
     fetch(`http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=${webUrl}`)
    .then(response => response.json())
    .then(data => callback(data.sentences))
}


window.addEventListener("hashchange", () => {
  document.querySelector("#headlines").innerHTML = ''
  let webUrl = `https://www.theguardian.com/${location.href.split("#")[1]}`
  getSummary(webUrl, (sentences) => {
    let summary = sentences.join(" ")
    document.querySelector("#summary").innerText = summary
  })
})