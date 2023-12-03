const Browser = require('./Browser')
const cheerio = require('cheerio');
const fs = require('fs/promises')



class Movie {


    async getVideoLinks() {
        try {

            const html = await Browser.getHtml("https://tubitv.com/movies/100005891/rocketry-the-nambi-effect");
            const $ = cheerio.load(html);

            const scriptTag = $('script:contains("window.__data")').html();

            // Extract the JSON object from the script tag
            const dataStartIndex = scriptTag.indexOf('{');
            const dataEndIndex = scriptTag.lastIndexOf('}') + 1;
            let jsonData = scriptTag.substring(dataStartIndex, dataEndIndex);
            jsonData = jsonData.replace(/\\u002F/g, "/")
            jsonData = jsonData.replace(/undefined/g, "\"\"")
            jsonData = jsonData.replace(/"currentDate":\s*new Date.*?,/g, '');
   
            // Parse the JSON object
            const parsedData = JSON.parse(jsonData);

            console.log(parsedData.video.byId)
            const sourceUrl = parsedData.video.byId[Object.keys(parsedData.video.byId)[0]].url;
            const sourceTxt = await Browser.getHtml(sourceUrl);

            const _gb_ =  sourceTxt.split('\n')

            console.log(_gb_[_gb_.length -2])

            return parsedData;

        } catch (error) {
            console.log(error)
        }

    }
}


module.exports = new Movie;