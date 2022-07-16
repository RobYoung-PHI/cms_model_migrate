
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  let matchkeys = ['updated_at', 'user_id', 'source_id', 'assoc_id', 'status']
  for (let key of data) {
    if (matchkeys.includes(key)) {
      let th = document.createElement('th');
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
}

function generateTable(table, data) {
  let matchkeys = ['updated_at', 'user_id', 'source_id', 'assoc_id', 'status']
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      if (matchkeys.includes(key)) {
        if (key == 'source_id' || key == 'assoc_id') {
          let cell = row.insertCell();
          let a = document.createElement('a');
          let linkText = document.createTextNode(element[key]);
          a.appendChild(linkText);
          a.title = element[key];
          a.href = 'https://app.contentful.com/spaces/srdmz6yont2x/environments/NewContentModel/entries/'.concat(element[key]);
          a.target = '_blank';
          document.body.appendChild(a);
          cell.appendChild(a);
        } else if (key == 'updated_at') {
          let assess_date = new Date(element[key]);
          let cell = row.insertCell();
          let text = document.createTextNode(assess_date.toISOString().substring(0, 19));
          cell.appendChild(text);
        } else if (key == 'status') {
          assess_status = element[key]
          if (assess_status == 'rejected') {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          } else if (assess_status == 'approved') {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
          } else {
            console.log('Fallthrough')
          }
        } else {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
    }
  }
}

async function fetchAsync () {
  let response = await fetch('https://z0kb9cr2ed.execute-api.us-east-1.amazonaws.com/main/resultscheck/', {
        method: 'GET',
        headers: {
            'X-API-KEY': 'MxomFM7F8N74wG5Sqkp397eeJkdNXHGTbhZihhxa',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
  let data = await response.json();
  return data;
}

fetchAsync()
    .then(
      data => {
        if (JSON.parse(data['body']).length > 0) {
          let table = document.querySelector("table");
          let tableData = JSON.parse(data['body']);
          let tableKeys = Object.keys(tableData[0]);
          generateTableHead(table, tableKeys);
          generateTable(table, tableData);
        } else {
          document.getElementById('result_status').innerHTML='No results available yet.'
        }
      }
    )
    .catch(reason => console.log(reason.message))
