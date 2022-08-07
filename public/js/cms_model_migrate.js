
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

async function fetchAsync () {
  aid = getParameterByName("aid")
  if (aid===null) {
    console.log("aid reference not supplied")
    console.log(aid)
    let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/modelcheck/'+getParameterByName("uid"), {
          method: 'GET',
          headers: {'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa', 'Accept': 'application/json','Content-Type': 'application/json'}
      });
    let data = await response.json();
    return data;
  } else {
    console.log("aid reference is:")
    console.log(aid)
    let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/modelcheck/'+getParameterByName("uid")+'/'+aid, {
          method: 'GET',
          headers: {'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa', 'Accept': 'application/json','Content-Type': 'application/json'}
      });
    let data = await response.json();
    return data;
  }
}

async function postAsync (payload) {
  aid = getParameterByName("aid")
  if (aid===null) {
    let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/modelcheck/'+getParameterByName("uid"), {
          method: 'POST',
          headers: {'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(payload)
      });
    let data = await response.json();
    return data;
  } else {
    let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/modelcheck/'+getParameterByName("uid")+'/'+aid, {
          method: 'POST',
          headers: {'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
          body: JSON.stringify(payload)
      });
    let data = await response.json();
    return data;
  }
}

const converter = new showdown.Converter();

fetchAsync()
    .then(
      data => {
        document.getElementById('remain_count').innerHTML='Remaining: '.concat(data.Items.length-1)
        element_ref = 1
        document.getElementById('source_id').innerHTML=data.Items[element_ref]['source_id']
        document.getElementById('source_title').innerHTML=('<h1><a href="https://app.contentful.com/spaces/srdmz6yont2x/environments/NewContentModel/entries/' + data.Items[element_ref]['source_id'] + '" target="_blank">' + data.Items[element_ref]['source_title'] + '</a></h1>')
        document.getElementById('source_body').innerHTML=converter.makeHtml(data.Items[element_ref]['source_body']);
        document.getElementById('assoc_id').innerHTML=data.Items[element_ref]['assoc_id']
        document.getElementById('assoc_title').innerHTML=('<h1><a href="https://app.contentful.com/spaces/srdmz6yont2x/environments/NewContentModel/entries/' + data.Items[element_ref]['source_id'] + '" target="_blank">' + data.Items[element_ref]['assoc_title'] + '</a></h1>')
        document.getElementById('assoc_body').innerHTML=converter.makeHtml(data.Items[element_ref]['assoc_body']);
        document.getElementById('approve_btn').style.display = 'block'
        document.getElementById('reject_btn').style.display = 'block'
      }
    )
    .catch(reason => console.log(reason.message))

async function post_resp(response_string) {
  document.getElementById('approve_btn').style.display = 'none';
  document.getElementById('reject_btn').style.display = 'none';
  document.getElementById('source_title').style.display = 'none';
  document.getElementById('source_body').style.display = 'none';
  document.getElementById('assoc_title').style.display = 'none';
  document.getElementById('assoc_body').style.display = 'none';
  document.getElementById('remain_count').innerHTML='Loading...'


  let response = {}
  aid = getParameterByName("aid")
  if (aid===null) {
    payload = { 'uid': getParameterByName("uid"), 'source_id': document.getElementById('source_id').innerHTML, 'assoc_id':document.getElementById('assoc_id').innerHTML, 'status': response_string};
  } else {
    payload = { 'uid': getParameterByName("uid"), 'aid': aid, 'source_id': document.getElementById('source_id').innerHTML, 'assoc_id':document.getElementById('assoc_id').innerHTML, 'status': response_string};
  }
  response = await postAsync(payload)
  .then( () => {
    console.log(response);
  })
  await new Promise(r => setTimeout(r, 5000))
  .then(
    location.reload()
  )
}
