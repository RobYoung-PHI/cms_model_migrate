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
  let response = {}
  try {
    response = await fetch('https://i70roqwrjj.execute-api.us-east-1.amazonaws.com/main/getgv?user_id='+getParameterByName("user_id"));
  } catch (err) {
    response = err
  }
  // let data = await response.json();
  let data = response
  return data;
}

fetchAsync()
    .then(
      console.log(data)
    )
    .catch(reason => console.log(reason.message))
