const puppeteer = require('puppeteer')
const uuid = require('uuid').v4

const downloadUrls = require('../data/download-urls.json')
const constants = require('./constants.json')
const { writeToJsonFile } = require('./utils')

const metadata = {}

;(async () => {
    const browser = await puppeteer.launch()
    const episodesUrlSuffixes = Object.keys(downloadUrls)
    for await (const episodeSuffix of episodesUrlSuffixes) {
        try {
            const page = await browser.newPage()

            // navigate to URL
            const episodeUrl = constants.mixcloundBaseUrl + episodeSuffix
            await page.goto(episodeUrl, {
                waitUntil: 'networkidle0',
            })
            // const doc = parser.parseFromString(html, "text/html");
            // const head = doc.window.document.querySelector("head");
            /**
            - title
            - link
            - description
            - pubDate
            - enclosure/link to audio file
            - thumbnail
            */
            const title = await page
                .$eval('meta[property="og:title"]', (el) => el.getAttribute('content'))
                .catch(() => page.$eval('title', (el) => el.innerText))
            const description = await page
                .$eval('meta[property="og:description"]', (el) => el.getAttribute('content'))
                .catch(() => '')
            const coverImage = await page
                .$eval('meta[name="twitter:image"]', (el) => el.getAttribute('content'))
                .catch(() => constants.coverImage)
            const length = await page
                .$eval(".total-time", (el)=>el.innerText)
            metadata[episodeSuffix] = {
                title,
                description,
                coverImage,
                length,
                source: downloadUrls[episodeSuffix],
                guid: uuid()
            }
        } catch (error) {
            console.error(`An error occurred while fetching ${episodeSuffix}: ${error.message}`)
        }
    }

    writeToJsonFile('metadata', metadata)

    await browser.close()
})()
