function ajax_get(url, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("responseText:" + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

ajax_get("https://api.thecatapi.com/v1/images/search?breed_ids=acur", function (
  data
) {
  const dataBreeds = data[0]["breeds"][0];
  //origin
  document.getElementById("first-cat-origin").innerHTML = dataBreeds["origin"];
  //name
  document.getElementById("first-cat-name").innerHTML = dataBreeds["name"];
  //image
  var html = '<img src="' + data[0]["url"] + '" alt="cat image">';
  document.getElementById("first-cat-image").innerHTML = html;
  //description
  document.getElementById("first-cat-description").innerHTML =
    dataBreeds["description"];
  //wiki url
  var wiki = document.getElementById("first-cat-wiki-button");
  wiki.onclick = function (event) {
    window.location.href = dataBreeds["wikipedia_url"];
  };
});

//acur
//amis

ajax_get("https://api.thecatapi.com/v1/images/search?breed_ids=amis", function (
  data
) {
  const dataBreeds = data[0]["breeds"][0];
  //origin
  document.getElementById("second-cat-origin").innerHTML = dataBreeds["origin"];
  //name
  document.getElementById("second-cat-name").innerHTML = dataBreeds["name"];
  //image
  var html =
    '<img src="' + data[0]["url"] + '" height="275vh" alt="cat image">';
  document.getElementById("second-cat-image").innerHTML = html;
  //description
  document.getElementById("second-cat-description").innerHTML =
    dataBreeds["description"];
  //wiki url
  var wiki = document.getElementById("second-cat-wiki-button");
  wiki.onclick = function (event) {
    window.location.href = dataBreeds["wikipedia_url"];
  };
});
