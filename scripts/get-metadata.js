const jsdom = require("jsdom");

const mixcloudUrls = require('../data/mixcloud-urls.json')

async function getHead(urls) {
    for await (const url of urls) {
      try {
        const response = await fetch(url);
        const html = await response.text();
        const doc = new jsdom.JSDOM(html);
        // const doc = parser.parseFromString(html, "text/html");
        // const head = doc.window.document.querySelector("head");
        const title = doc.window.document.querySelector("title").textContent
        console.log(title);
      } catch (error) {
        console.error(`An error occurred while fetching ${url}: ${error}`);
      }
    }
  }


getHead(mixcloudUrls)
  