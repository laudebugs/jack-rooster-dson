const puppeteer = require('puppeteer')

const urls = require('../data/mixcloud.json');
const { writeToJsonFile } = require('./utils');

const downloadUrls = {}

async function getDownloadUrls() {
    const browser = await puppeteer.launch()
    let i = 1
    for (let url of urls) {
        try {
            const page = await browser.newPage()

            // navigate to URL
            await page.goto(url)

            // click on button with class "primary button"
            await page.click('.button-primary')

            // navigate to second page
            await page.waitForNavigation()

            // select link with id "download_button"
            const downloadButton = await page.$('#download_button')
            const href = await page.evaluate((el) => el.getAttribute('href'), downloadButton)

            // add href to dls array
            let slug = url.split('/').filter(url=> url.length>0).pop()
            downloadUrls[decodeURIComponent(slug)] = href
            console.log(`success parsing ${i} of ${urls.length}`)
        } catch (e) {
            console.log(`failed parsing ${i} of ${urls.length}`)
            console.log(e.message)
        } finally {
            i += 1
        }
    }

    writeToJsonFile('download-urls.json', downloadUrls)

    await browser.close()
}

getDownloadUrls()