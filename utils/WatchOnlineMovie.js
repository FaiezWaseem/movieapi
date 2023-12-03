const Browser = require('./Browser')
const cheerio = require('cheerio')


/**
 *  @default Site "https://www.movieswatchonline0.com.pk"
 *  @default Name  WatchMoviesOnline
 */

class Movie {
    domain = "https://www.movieswatchonline0.com.pk";
    /**
     * 
     * @param {'indian-movies' | 'watch-hindi-dubbed-full-movies' | 'watch-punjabi-movies-online' | 'english-movies-free' | 'horror-movies' | 'shows-series' } category 
     * @param {Number | null} page 
     * @returns 
     */
    async getMovieByCategory(category = 'indian-movies', page = null) {
        try {
            let url = `${this.domain}/category/${category}/`
            if (page) {
                url += `/page/${Number(page)}/`
            }
            const html = await Browser.getHtml(url)
            return this.parseMovies(html);
        } catch (error) {
            console.warn(error.message)
            return []
        }
    }
    async getHome() {
        try {
            let url = this.domain
            const html = await Browser.getHtml(url)
            return this.parseMovies(html);
        } catch (error) {
            console.warn(error.message)
            return []
        }
    }

    /**
     * 
     * @param {String | null} query 
     * @param {Number | null} page 
     * @returns 
     */
    async search(query = null, page = null) {
        try {
            let url = this.domain
            if (page) {
                url += `/page/${Number(page)}/`
            }
            if (query) {
                url += `?s=${query}`
            }
            const html = await Browser.getHtml(url)
            return this.parseMovies(html);

        } catch (error) {
            console.warn(error.message)
            return []
        }
    }
    async movieLink(url) {
        const html = await Browser.getHtml(url)
        const $ = cheerio.load(html);
        const downloadLinks = [];

        $('a').each((index, element) => {
          const text = $(element).text();
          const href = $(element).attr('href');
          
          if (text.match(/Click to Download/i)) {
            downloadLinks.push({
              text: text,
              href: href
            });
          }
        });
        return downloadLinks
    }
    async parseMovies(html = '') {
        const $ = cheerio.load(html)
        const items = $('.postbox')
        let movies = [];
        await items.each((i, el) => {
            const movieElement = $(el);
            // Extract image URL
            let imageUrl = movieElement.find('img').attr('data-srcset');
            try {
            imageUrl = imageUrl.split(',');            
            } catch (error) {
               return   
            } 
            let images = [];
            for (let i = 0; i < imageUrl.length; i++) {
                const element = imageUrl[i];
                const regex = /(https:\/\/.*\.jpg)\s(\d+w)/;
                const matches = element.match(regex);

                if (matches && matches.length >= 3) {
                const url = matches[1];
                const width = matches[2];
                images.push({
                    url,
                    width
                })
    
                } else {
                console.log('Invalid string format');
                }
                
            } 
             
            // Extract title
            const title = movieElement.find('.boxtitle h2 a').text();

            // Extract link
            const link = movieElement.find('.boxtitle h2 a').attr('href');

            const movie = {images,title,link}
            // console.log('\n\n');
            // console.log(JSON.stringify(movie, null, 4))
            movies.push(movie)
        });
        return movies
    }

}

module.exports = new Movie;