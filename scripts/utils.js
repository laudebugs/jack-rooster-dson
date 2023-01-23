const fs = require('fs')

const writeToJsonFile = (filename, data)=>{
    fs.writeFileSync('./data/' + filename + '.json', JSON.stringify(data, null, 4))
}

module.exports = { writeToJsonFile }