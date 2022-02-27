const searchPlayer = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchFieldText}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => displayPlayers(data.player))
    
} 

const displayPlayers = players => {
    const searchResult = document.getElementById('search-result');
    players.forEach(player => {
        console.log(player);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="playerDetail(${player.idPlayer})" class="card h-100">
            <img src="${player.strThumb ? player.strThumb : 'images/download.png'}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p class="card-text">${player.strDescriptionEN ? player.strDescriptionEN.slice(0,200): ''}...</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">${player.strFacebook ? player.strFacebook : "No Social Media was linked"}</small>
            </div>
          </div>
        `
        searchResult.appendChild(div);
    });
}

const playerDetail = player => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${player}`;
    fetch(url)
    .then(Response => Response.json())
    .then(data => displayPlayerDetail(data.players[0]))
}

const displayPlayerDetail = playerDetail => {
    console.log(playerDetail);
    const playerDiv = document.getElementById('player-detail');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${playerDetail.strThumb? playerDetail.strThumb : 'images/download.png'}" class="card-img-top w-50 mx-auto" alt="...">
        <div class="card-body mx-auto">
          <h5 class="card-title">${playerDetail.strPlayer}</h5>
          <p class="card-text"><b>Bith Place:</b> ${playerDetail.strBirthLocation}</p>
          <p class="card-text"><b>Born Date:</b> ${playerDetail.dateBorn}</p>
          <p class="card-text"><b>National Team:</b> ${playerDetail.strTeam2}</p>
          <p class="card-text"><b>Current Club:</b> ${playerDetail.strTeam}</p>
          <p class="card-text"><b>Height:</b> ${playerDetail.strHeight}</p>
          <p class="card-text"><b>Weight:</b> ${playerDetail.strWeight}</p>
          <p class="card-text"><b>Position:</b> ${playerDetail.strPosition}</p>
          <p class="card-text"><b>Details:</b> ${playerDetail.strDescriptionEN}</p>
          <a href="${playerDetail.strFacebook}" class="btn btn-primary">Go Profile</a>
        </div>
    `
    playerDiv.appendChild(div);
}