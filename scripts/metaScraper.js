const ogs = require('open-graph-scraper');
const url = 'https://www.mixcloud.com/jackrooster/deeper-sounds-of-nairobi-050-venice-italy/'
const options = { url };
(async()=>{

    ogs(options)
    .then((data) => {
        const { error, result, response } = data;
        // console.log('error:', error);  // This returns true or false. True if there was an error. The error itself is inside the results object.
        console.log('result:', result); // This contains all of the Open Graph results
        // console.log('response:', response); // This contains the HTML of page
    })
})()