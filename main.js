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
        res.write("<html>");
        res.write("<body>");
        res.write("<title>Portfolio</title>");
        //res.write("link rel='stylesheet' type='text/css' href='styles.css' />");
        res.write("</body>");
        res.write("</html>");
        res.statusCode = 200;

        res.end();
        return;
    }


    console.log("req url: ", req.url);
    console.log("reqPath:  ", reqPath);
}).listen(PORT, () => console.log(`Listening on port: ${PORT}`))