export default class Query {
    constructor(dest, id = false) {
        let urls = {
            posts: "/wp-json/wp/v2/posts",
            profile: "/wp-json/wp/v2/users/me?context=edit",
            user: "/wp-json/wp/v2/users/",
            mesures: "/wp-json/wp/v2/mesures",
            mesuresByAuthor: "/wp-json/wp/v2/mesures/?author=",
            exByProg: "/wp-json/wp/v2/exercices/?categories=",
            rdv: '/wp-json/wp/v2/rendez_vous/',
            conseils: '/wp-json/wp/v2/nutrition/',
            media: '/wp-json/wp/v2/media'
        };
        if (!id) {
            this.url = urls[dest];
        } else if(dest==="user"){
            this.url = urls[dest] + id + "?context=edit"
        } else {
            this.url = urls[dest] + id;
        }
        if (this.url.includes('?')) {
            this.url += '&_wpnonce='
        } else {
            this.url += '?_wpnonce='
        }
    }

    async get() {
        let url = this.url;
        let data = await fetch(url + window.nonce);
        console.log(url);
        window.nonce = data.headers.get('X-WP-Nonce');
        return data;
    }
    async post(datas) {
        let url = this.url;
        let data = await fetch(url + window.nonce, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-WP-Nonce': window.nonce
            }),
            body: JSON.stringify(datas)
        })
        window.nonce = data.headers.get('X-WP-Nonce');
        return data;
    }
    async postMedia(datas) {
        let url = this.url;
        //dynamically get file type
        let file = datas[0];
        //generate some random number for the filename
        // var randNumber1 = Math.floor(Math.random() * 100);
        // var randNumber2 = Math.floor(Math.random() * 100);
        
        let result = await this.toBase64(file);

        let data = await fetch(url + window.nonce, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'multipart/form-data',
                'Cache-Control' : 'no-cache',
                'Accept': 'application/json',
                'Content-Disposition': 'attachment; filename='+file.name,
                'X-WP-Nonce': window.nonce
            }),
            body: result
        })
        window.nonce = data.headers.get('X-WP-Nonce');
        return data;
    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}