const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class Browser {
    async getHtml(url){
        let options = {
            method: 'GET',
            headers: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Content-Type': 'text/html',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Mobile Safari/537.36'
            }
        };
        const req = await fetch(url, options)
        const html = await req.text();
        return html;
    }

}


module.exports = new Browser()