const fs = require("fs");
const request = require("request");

const download = (url, fileName) =>
  new Promise((resolve, reject) => {
    request(url)
      .pipe(fs.createWriteStream(fileName))
      .on("close", resolve)
      .on("error", reject);
  });

const downloadFiles = async (fileList) => {
  for (let fileName in fileList) {
    try {
      await download(fileList[fileName], `../data/audio/${fileName}.mp3`);
      console.log(`Successfully downloaded ${fileName}`);
    } catch (error) {
      console.error(`Error downloading ${fileName}: ${error}`);
    }
  }
};

fs.readFile("../data/download-urls-obj.json", "utf8", (err, data) => {
  if (err) throw err;
  const fileList = JSON.parse(data);
  downloadFiles(fileList);
});