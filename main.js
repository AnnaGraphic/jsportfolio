const http = require('http')
const fs = require('fs')
const path = require("path");
const PORT = '8080'
const contentTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

// +++++ CREATE SERVER +++++
http.createServer((req, res) => {

// ----- filepath -----
const reqPath = path.join(__dirname, "projects", req.url);

    if (req.method !== "GET") {
    res.statusCode = 405;
    res.end();
    return;
    }

    if (req.url == ('/')) {

        res.setHeader("Content-Type", "text/html");
        res.write( `<!doctype html>
        <html>
        <title>Portfolio</title>
        <link rel="stylesheet" href="styles.css" />
        <h1>Portfolio</h1>
        </html>`);
        res.statusCode = 200;
        res.end();
        return;
    }

if (fs.existsSync(reqPath)) {
    if (fs.statSync(reqPath).isDirectory()) {
        if (req.url.endsWith('/')) {
            const indexHTMLPath = payh.join(reqPath, 'index.html');
            if (fs.existsSync(indexHTMLPath) && fs.statSync(indexHTMLPath).isFile())
            {
                const readStream = fs.createReadStream(indexHTMLPath);
                readStream.pipe(res);
                readStream.on('end', () => {
                    res.end();
                });
            } else {
                res.statusCode = 404;
                res.end();
                return;
            }
        } else {
            res.writeHead(301, { Location: req.url + "/"});
            res.end();
        }
    } else {
        const readStream = fs.createReadStream(reqPath);
        readStream.pipe(res);
        readStream.on('end', () => {
            res.end();
        });
    }
} else {
    res.statusCode = 404;
    res.end();
    return;
}

    console.log("req url: ", req.url);
    console.log("reqPath:  ", reqPath);
    
}).listen(PORT, () => console.log(`Listening on port: ${PORT}`))