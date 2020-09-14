**Strategy/Approach**
***
**Initial Load**
---
* What does the website look like before ajax?
* After Ajax Call
* Create DOM Nodes
* Insert DOM Nodes

**On inital load:**
---
* Set loading variable to true
* do Promise.all on all ajax calls
* User gets blank screen until after 1000ms, then they get a loading screen

**Promise.all([catFetch('acur'), catFetch('amis'))]):**
---
* This fetches results for cat API
* What happens if api fails? implement retry, after 3 retries, create a page that     says please reload the page

**After Promise.all resolves:**
---
* Set loading to false
* Since loading is false. it starts building the DOM

**Building the DOM**
* API: function createContainer(apiPayload, layoutType)
* layoutType = IMAGE_TOP | IMAGE_BOTTOM
* api_payload: results from cat API

**createContainer**
* Get properties from apiPayload
* Create DOM mpdes from apiPayload
* Insert DOM Nodes
* add addEventListener to button with a function called on initial load

**How to compile/transpile your SASS/SCSS files to CSS Files at realtime with live       browser reload:**
1. Install Live Sass Compiler Extension on code editor
2. Click to "Watch Sass" from Statusbar to turn on the live compilation
