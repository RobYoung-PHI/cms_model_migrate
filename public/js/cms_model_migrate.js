function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// response = await fetch('https://i70roqwrjj.execute-api.us-east-1.amazonaws.com/main/getgv?user_id='+getParameterByName("user_id"), { mode: 'cors', headers: { 'x-api-key': 'ihl9Ec68TX4asxR619oHaBbC1YaBAiu3Lnd5Rh63', 'Access-Control-Allow-Origin': '*', 'Accept': '*/*' } } )
//    , { mode: 'cors', headers: { 'x-api-key': '5485748746547e847483983343433243', 'User-Agent' : 'My-App', 'Accept': '*/*'}}

async function fetchAsync () {
  let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/modelcheck/'+getParameterByName("uid"), {
        method: 'GET',
        headers: {
            'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify(callData)
    });
  let data = await response.json();
  return data;
}

fetchAsync()
    .then(
      data => {
        for (let i = 0; i < data.Items.length; i++) {
          console.log(data.Items[i])
          //document.getElementById("tile"+(i+1)).src = 'img/Scrabble_Tile_'+data.Items[0].tileRack.charAt(i)+'.jpg'
        }
      }
    )
    .catch(reason => console.log(reason.message))
