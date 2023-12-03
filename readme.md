Simple Movie Api by scrapping

## Tech 
-  Nodejs
-  Cheerio
-  node-fetch


## Sites Scrapped & Working 

- [x] Watch Online Movies [visit](https://www.movieswatchonline0.com.pk)
- [ ] TubiTv [visit](https://tubitv.com)

## Routes 
### SITE : Watch Online Movies

### REQUEST : GET

root_path : /wom , /wmo , /watch-online-movies , /watch-movies-online

paths 
    
  path: /search/:query/:pagenum
    
    demo : http://localhost:8888/watch-online-movies/search/animal/1


   path:/
    
    demo : http://localhost:8888/watch-online-movies/

   path: /:category
    
    demo : http://localhost:8888/watch-online-movies/indian-movies/
    demo : http://localhost:8888/watch-online-movies/english-movies-free/
    demo : http://localhost:8888/watch-online-movies/animated-hindi-movies/
    
   path: /:category/page/:num
    
    demo : http://localhost:8888/watch-online-movies/indian-movies/page/2
    demo : http://localhost:8888/watch-online-movies/english-movies-free/page/3
    demo : http://localhost:8888/watch-online-movies/animated-hindi-movies/page/4
    
   path: /movie/link?link=??
    
    demo : http://localhost:8888/watch-online-movies/movie/link?=https://www.movieswatchonline0.com.pk/ruby-gillman-teenage-kraken-2023-hindi-dubbed-full-movie-watch-online-hd-print-free-download/
    
    
    