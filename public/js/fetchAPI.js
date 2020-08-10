const base_url = "https://api.football-data.org/v2/";
//token 9df41344b9a94af789368c507dcbdf99
// Sender ID Firebase = 517541005326 
// {"publicKey":"BPYaoRVHrCprZQVAFIhmfYULW-Szxe9Hj0SbhgMxnKDdQrfiyJJC7GHZl5LR2iknYOnL8TSQzkYasleyiJVmxN4","privateKey":"mn7ACEGVvEyWVNz6CgMK_PUOgh2F19F-hIRg8qbV_uc"} 

const FetchAPI = (url) => {
  return fetch(url, {
    headers: { 'X-Auth-Token': '9df41344b9a94af789368c507dcbdf99'}
    })
}

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  }


function json(response) {
    return response.json();
  }

function error(error) {
    console.log("Error : " + error);
}

const MatchGetArticlesFootball = (team) => {
  let articlesHTML = `
    `;
    const match = team.matches.reverse().slice(0, 20);
    match.forEach(hasil => {
      if (hasil.score.fullTime.homeTeam || hasil.score.fullTime.awayTeam) {
        articlesHTML += `
                <tr>
                    <td class="center-align" ><span>${hasil.homeTeam.name}</span> <br>
                    <a href="./article.html?id=${hasil.homeTeam.id}">show team detail</a></td>
                    <td class="center-align" >vs</td>
                    <td class="center-align"><span>${hasil.awayTeam.name}</span> <br>
                    <a href="./article.html?id=${hasil.awayTeam.id}">show team detail</a></td>
                    <td class="center-align score scoreHome">${hasil.score.fullTime.homeTeam} </td>
                    <td class="center-align score">${hasil.score.fullTime.awayTeam}</td>
                </tr> 
            `;
      }
    });
    document.getElementById("tbody").innerHTML = articlesHTML;
}

const TeamGetArticleById = (teams) => {
              const data = teams;
              const articleHTML = `
              <div class="teamName col s6">
                <h5>${data.name}</h5>
                <span>${data.area.name}</span> 
              </div>
      
              <div class="aboutTeam col s8 offset-s2">
                  <p>Address: ${data.address} </p>
                  <p>Phone: ${data.phone}</p>
                  <p>Email: ${data.email}</p>
                  <p>Website: <a href="${data.website}""> ${data.website}</a></p>
              </div>`;
      
              let tablePlayer = ``;
      
              data.squad.forEach(player => {
                if (player.position != null) 
                  tablePlayer += `
                    <tr>
                          <td class="center-align" ><span>${player.name}</span></td>
                          <td class="center-align" >${player.position}</td>
                          </tr>`;
                          document.querySelector("#tablePlayer").innerHTML = tablePlayer;           
              })
              document.getElementById("body-content").innerHTML = articleHTML;
}

function getArticlesFootball() {
    if ("caches" in window) {
    caches.match(`${base_url}competitions/2001/matches`).then(function(response) {
    if (response) {
        response.json().then( data => {
          MatchGetArticlesFootball(data);
        });
    }
    });
}
const url = `${base_url}competitions/2001/matches`;
  FetchAPI(url)
    .then(status)
    .then(json)
    .then(function(data) { 
      MatchGetArticlesFootball(data);
    })
}

function getArticleById() {
    return new Promise(function(resolve, reject) {
          var urlParams = new URLSearchParams(window.location.search);
          var idParam = urlParams.get("id");
      
          if ("caches" in window) {
            caches.match(base_url+ "teams/" + idParam).then(function(response) {
              if (response) {
                response.json().then(function(data) {
                  TeamGetArticleById(data);
                  resolve(data);
                });
              }
            });
          }    
          const url = `${base_url}teams/${idParam}`;
          FetchAPI(url)
            .then(status)
            .then(json)
            .then(data => {
              TeamGetArticleById(data);
              resolve(data);
            });
    })
}
  
function getSavedArticles() {
  getAll().then(function(data) {
    let allTeam = ``;
    data.forEach(hasil => {
      allTeam += `<a href="./article.html?id=${hasil.id}&saved=true" class="collection-item center nameTeam">${hasil.name}</a>
      <a id="${hasil.id}" class="btnRemove waves-effect waves-light btn-small">Remove</a>
      `;
    });
    document.querySelector(".teams").innerHTML = allTeam;
    
    let btnRemove = document.querySelectorAll(".btnRemove");
    for(let button of btnRemove){
      button.addEventListener("click", evt => {
        console.log(typeof(evt.target.id))
        console.log("id " + evt.target.id)
        let teamId = parseInt(evt.target.id);
        dbDelete(teamId).then(() => getSavedArticles())
})
    }
  });
}


function getSavedArticleById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(parseInt(idParam)).then(function(data) {
    const articleHTML = `
      <div class="teamName col s6 ">
        <h5>${data.name}</h5>
        <span>${data.area.name}</span> 
      </div>

      <div class="aboutTeam col s8 offset-s2">
          <p>Address: ${data.address} </p>
          <p>Phone: ${data.phone}</p>
          <p>Email: ${data.email}</p>
          <p>Website: <a href="${data.website}""> ${data.website}</a></p>
      </div>`;

      let tablePlayer = ``;

      data.squad.forEach(player => {
        if (player.position != null) 
          tablePlayer += `
            <tr>
                  <td class="center-align" ><span>${player.name}</span></td>
                  <td class="center-align" >${player.position}</td>
                  </tr>`;
                  document.querySelector("#tablePlayer").innerHTML = tablePlayer;           
      })
    document.querySelector("#body-content").innerHTML = articleHTML;
  });
}
