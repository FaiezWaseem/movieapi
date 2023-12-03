const Browser = require('./Browser')
const cheerio = require('cheerio');
const fs = require('fs/promises')



class Movie {


    async getVideoLinks(url) {
        try {

            const html = await Browser.getHtml(url);
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

     
            const sourceUrl = parsedData.video.byId[Object.keys(parsedData.video.byId)[0]].url;
            const sourceTxt = await Browser.getHtml(sourceUrl);

            const BG_URL = "https://manifest.production-public.tubi.io/ca3b01c8-93c1-42b8-8a87-a36cd7b8f505/";
            const _gb_ = sourceTxt.split('\n')
            const _url = BG_URL + _gb_[_gb_.length - 2];

            let _audio_url =  _gb_[4]

            const uriRegex = /URI="([^"]*)"/;
            const match = _audio_url.match(uriRegex);

            if (match && match.length > 1) {
                 _audio_url = BG_URL + match[1];
            } else {
                console.log('No URI found in the string.');
            }

            let allUrls = await Browser.getHtml(_url);
            allUrls = allUrls.split('\n');
            const Videourl = allUrls[allUrls.length - 3];
          
          
            let allAudioUrls = await Browser.getHtml(_audio_url);
            allAudioUrls = allAudioUrls.split('\n');
            const Audiourl = allAudioUrls[allAudioUrls.length - 3];

            console.log(Videourl , Audiourl)

            return {
                video : Videourl,
                audio : Audiourl
            }

        } catch (error) {
            console.log(error)
        }

    }
}


module.exports = new Movie;