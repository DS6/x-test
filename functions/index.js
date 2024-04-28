const fetch = require('node-fetch');

module.exports = class Function {

minify = async (code, type) => {
    return new Promise(async (resolve) => {
        try {

            const src = new URLSearchParams({ input: code }).toString();

            let ENDPOINT = '';
            
            switch (type) {
                case 'js':
                    ENDPOINT = 'https://www.toptal.com/developers/javascript-minifier/api/raw';
                    break;
                case 'css':
                    ENDPOINT = 'https://www.toptal.com/developers/cssminifier/api/raw';
                    break;
                default:
                    return resolve({
                        creator: "simple - nijuxi",
                        status: false,
                        msg: `Invalid type: ${type}`
                    });
            }

            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': src.length.toString(),
                },
                body: src,
            });

            if (!response.ok) {
                console.log('StatusCode=' + response.status);
                return resolve({
                    creator: "simple - nijuxi",
                    status: false,
                    msg: `Failed to minify ${type} code`
                });
            }

            const data = await response.text();

            resolve({
                creator: 'simple - nijuxi',
                status: true,
                data: data
            });
        } catch (e) {
            resolve({
                creator: 'simple - nijuxi',
                status: false,
                msg: e.message
            });
        }
    });
}

}