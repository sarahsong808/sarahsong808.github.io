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

//acur
//amis

const LAYOUT_TYPES = {
  IMAGE_TOP: "IMAGE_TOP",
  IMAGE_BOTTOM: "IMAGE_BOTTOM"
};

function createCatContainer(breedsApiPayload, layoutType, parentNode) {
  const { url, breeds } = breedsApiPayload;
  console.log(breeds);
  const { origin, name, description, wikipedia_url } = breeds[0];
  switch (layoutType) {
    case LAYOUT_TYPES.IMAGE_TOP: {
      const catContainerFragment = new DocumentFragment();
      const catContainer = Object.assign(document.createElement("div"), {
        className: "first-cat-container"
      });
      const catInfo = Object.assign(document.createElement("div"), {
        className: "first-cat-info"
      });
      const catOrigin = Object.assign(document.createElement("div"), {
        textContent: origin,
        className: "first-cat-origin"
      });
      const catName = Object.assign(document.createElement("div"), {
        textContent: name,
        className: "first-cat-name"
      });
      const catDescription = Object.assign(document.createElement("div"), {
        textContent: description,
        className: "first-cat-description"
      });

      const catWikiButton = Object.assign(document.createElement("button"), {
        onclick: function (event) {
          window.location.href = wikipedia_url;
        },
        className: "first-cat-wiki-button",
        textContent: "Meow Info"
      });

      const imgDiv = Object.assign(document.createElement("div"), {
        className: "first-cat-image"
      });
      const img_URL = Object.assign(document.createElement("img"), {
        src: url
      });
      const innerInfoWrapper = document.createElement("div");
      const domNodes = [catOrigin, catName, catDescription, catWikiButton];
      domNodes.forEach(node => innerInfoWrapper.appendChild(node));
      catInfo.appendChild(innerInfoWrapper);
      imgDiv.appendChild(img_URL);
      catContainer.appendChild(imgDiv);
      catContainer.appendChild(catInfo);
      catContainerFragment.appendChild(catContainer);
      parentNode.appendChild(catContainerFragment);
      break;
    }
    case LAYOUT_TYPES.IMAGE_BOTTOM: {
      const catContainerFragment = new DocumentFragment();
      const catContainer = Object.assign(document.createElement("div"), {
        className: "second-cat-container"
      });
      const catInfo = Object.assign(document.createElement("div"), {
        className: "second-cat-info"
      });
      const catOrigin = Object.assign(document.createElement("div"), {
        textContent: origin,
        className: "second-cat-origin"
      });
      const catName = Object.assign(document.createElement("div"), {
        textContent: name,
        className: "second-cat-name"
      });
      const catDescription = Object.assign(document.createElement("div"), {
        textContent: description,
        className: "second-cat-description"
      });

      const catWikiButton = Object.assign(document.createElement("button"), {
        onclick: function (event) {
          window.location.href = wikipedia_url;
        },
        className: "second-cat-wiki-button",
        textContent: "More Infur"
      });

      const imgDiv = Object.assign(document.createElement("div"), {
        className: "second-cat-image"
      });
      const img_URL = Object.assign(document.createElement("img"), {
        src: url
      });
      const innerInfoWrapper = document.createElement("div");
      const domNodes = [catOrigin, catName, catDescription, catWikiButton];
      domNodes.forEach(node => innerInfoWrapper.appendChild(node));
      catInfo.appendChild(innerInfoWrapper);
      imgDiv.appendChild(img_URL);
      catContainer.appendChild(catInfo);
      catContainer.appendChild(imgDiv);
      catContainerFragment.appendChild(catContainer);
      parentNode.appendChild(catContainerFragment);
      break;
    }
    default: {
      throw new Error("Invalid Layout");
    }
  }
}

function createFirstCatContainer(id) {
  ajax_get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`,
    function (data) {
      const parentNode = document.querySelector(".cats-wrapper");
      createCatContainer(data[0], LAYOUT_TYPES.IMAGE_TOP, parentNode);
    }
  );
}
function createSecondCatContainer(id) {
  ajax_get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`,
    function (data) {
      const parentNode = document.querySelector(".cats-wrapper");
      createCatContainer(data[0], LAYOUT_TYPES.IMAGE_BOTTOM, parentNode);
    }
  );
}

createFirstCatContainer("acur");
createSecondCatContainer("amis");
/**
 * - Initial Load
 *  = What doe sthe website look like before ajax?
 * - After Ajax Call
 *  - Create DOM Nodes
 *  - Insert DOM Nodes
 *
 * On inital load:
 * - Set loading variable to true
 * - do Promise.all on all ajax calls
 * - User gets blank screen until after 1000ms, then they get a loading screen
 *
 * Promise.all([catFetch('acur'), catFetch('amis'))])
 * - This fetches results for cat API
 *
 * After Promise.all resolves
 * - Set loading to false
 * - Since loading is false. it starts building the DOM
 *
 * Building the DOM
 * - API: function createContainer(apiPayload, layoutType)
 * layoutType = IMAGE_TOP | IMAGE_BOTTOM
 * api_payload: results from cat API
 *
 * createContainer
 * - Get properties from apiPayload
 * - Create DOM mpdes from apiPayload
 * - Insert DOM Nodes
 */
