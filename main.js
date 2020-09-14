const LAYOUT_TYPES = {
  IMAGE_TOP: "IMAGE_TOP",
  IMAGE_BOTTOM: "IMAGE_BOTTOM"
};
const wikipediaRedirection = event =>
  (document.location.href = event.target["data-wiki-url"]);

function createCatContainer(breedsApiPayload, layoutType, parentNode) {
  const { url, breeds } = breedsApiPayload;
  const { origin, name, description, wikipedia_url } = breeds[0];
  switch (layoutType) {
    case LAYOUT_TYPES.IMAGE_TOP: {
      const catContainerFragment = new DocumentFragment();
      const catContainer = Object.assign(document.createElement("div"), {
        className: "first-cat-container flex-center"
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
        className: "first-cat-wiki-button",
        textContent: "MEOW INFO",
        "data-wiki-url": wikipedia_url
      });
      catWikiButton.addEventListener("click", wikipediaRedirection);
      const imgDiv = Object.assign(document.createElement("div"), {
        className: "first-cat-image flex-center"
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
        className: "second-cat-container flex-center"
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
        className: "second-cat-wiki-button",
        textContent: "MORE INFUR",
        "data-wiki-url": wikipedia_url
      });
      catWikiButton.addEventListener("click", wikipediaRedirection);
      const imgDiv = Object.assign(document.createElement("div"), {
        className: "second-cat-image flex-center"
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
//fetch data from api with retries if fail
function catFetch(id, retries = 3, backoff = 300) {
  const retryCodes = [408, 500, 502, 503, 504, 522, 524];
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`)
    .then(res => {
      if (res.ok) return res.json();

      if (retries > 0 && retryCodes.includes(res.status)) {
        setTimeout(() => {
          return catFetch(url, options, retries - 1, backoff * 2);
        }, backoff);
      } else {
        throw new Error(res);
      }
    })
    .catch(console.error);
}

let loading = true;
Promise.all([catFetch("acur"), catFetch("amis")]).then(result => {
  const parentNode = document.querySelector(".cats-wrapper");
  createCatContainer(result[0][0], LAYOUT_TYPES.IMAGE_TOP, parentNode);
  createCatContainer(result[1][0], LAYOUT_TYPES.IMAGE_BOTTOM, parentNode);
  loading = false;
});

setTimeout(() => {
  if (loading) {
    const loadingPage = Object.assign(document.createElement("div"), {
      textContent: "Loading..."
    });
    const parentNode = document.querySelector(".cats-wrapper");
    parentNode.appendChild(loadingPage);
  }
}, 1000);
