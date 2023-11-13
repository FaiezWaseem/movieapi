const Browser = require('./Browser')
const cheerio = require('cheerio')

class Movie {
    /**
     * 
     * @param {'netflix' | 'hulu' | 'prime-video' | 'disney' | 'hbo'} network 
     * @param {Number | null} page 
     * @returns 
     */
    async getTopNetworks(network = 'netflix' , page = null) {
        try {
            let url = `https://w2.123-movies.lol/networks/${network}`
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
    /**
     * 
     * @param {'action' | 'animation' | 'comedy' | 'kids' | 'news' | 'talk' | 'war'} network 
     * @param {Number | null} page 
     * @returns 
     */
    async getGenre(genre , page = null){
        // https://w2.123-movies.lol/genre/action/
        try {
            let url = `https://w2.123-movies.lol/genre/${genre}`
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
            let url = "https://w2.123-movies.lol/home/"
            const html = await Browser.getHtml(url)
            return this.parseMovies(html);
        } catch (error) {
            console.warn(error.message)
            return []
        }
    }
    async getTopImbdb(page = null) {
        try {
            let url = "https://w2.123-movies.lol/top-imdb/"
            if (page) {
                url += `page/${Number(page)}/`
            }
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
            let url = "https://w2.123-movies.lol"
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
        // Extract the value of id2 variable
        const scriptTags = $('script');
        let id2Value = null;

        scriptTags.each((index, element) => {
            const scriptContent = $(element).html();
            const pattern = /var id2 = "(.*?)";/;
            const match = scriptContent.match(pattern);

            if (match && match[1]) {
                id2Value = match[1];
                return false; // Exit the loop if a match is found
            }
        });

        console.log('id2 Value:', id2Value);
        return 'https'+id2Value
    }
    async parseMovies(html = '') {
        const $ = cheerio.load(html)
        const items = $('.ml-item')
        let movies = [];
        await items.each((i, el) => {
            const movieElement = $(el);

            const http = 'https';
            const link = http + $('.ml-item a').attr('href');
            const thumbnail = http + movieElement.find('.mli-thumb').attr('data-original');
            const thumbnailName = thumbnail.split('/').pop().split('.')[0];
            const title = movieElement.find('.mli-info h2').text();
            const movieId = movieElement.attr('data-movie-id');
            const releaseYear = movieElement.find('.jtip-top .jt-info a').text();
            const genreElements = movieElement.find('.block a');
            const genres = [];
            const genreLinks = [];
            const description = movieElement.find('p.f-desc').text();

            genreElements.each((index, element) => {
                genres.push($(element).text());
                genreLinks.push(http + $(element).attr('href'));
            });
            const movie = {
                link,
                thumbnail,
                title,
                movieId,
                releaseYear,
                genres,
                genreLinks,
                description,
                videoSrc: `https://vidsrc.xyz/embed/movie?color=0396f1&imdb=${thumbnailName}`,
            }

            // console.log('\n\n');
            // console.log(JSON.stringify(movie, null, 4))
            movies.push(movie)
        });
        return movies
    }

}

module.exports = new Movie;