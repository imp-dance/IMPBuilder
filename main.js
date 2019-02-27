const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const opn = require("opn");

http
  .createServer(function(req, res) {
    // console.log(`${req.method} ${req.url}`);

    // parse URL
    const parsedUrl = url.parse(req.url);
    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;
    // based on the URL path, extract the file extention. e.g. .js, .doc, ...
    const ext = path.parse(pathname).ext;
    // maps file extention to MIME typere
    const map = {
      ".ico": "image/x-icon",
      ".html": "text/html",
      ".js": "text/javascript",
      ".json": "application/json",
      ".css": "text/css",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".wav": "audio/wav",
      ".mp3": "audio/mpeg",
      ".svg": "image/svg+xml",
      ".pdf": "application/pdf",
      ".doc": "application/msword"
    };
    let fixCase = text => {
      return decodeURI(
        text
          .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
          })
          .replace(/\s+/g, "")
      );
    };
    let tryDownload = path => {
      // this is now our download hook
      // example url: ./download/here is the filename|1|1
      let data = pathname.substring(11).split("%7C");
      let title = fixCase(data[0]);
      let type = data[1];
      console.log(`Try downloading ${title} | ${type}`);

      return 404; // res.statusCode
    };
    fs.exists(pathname, function(exist) {
      if (!exist) {
        if (pathname.startsWith("./download/")) {
          // Check if it's trying to download
          res.statusCode = tryDownload(pathname);
          res.statusCode == 404
            ? res.end(`File ${pathname} not found!`)
            : res.end();
        } else {
          // if the file is not found, return 404
          res.statusCode = 404;
          res.end(`File ${pathname} not found!`);
        }
        return;
      }

      // if is a directory search for index file matching the extention
      if (fs.statSync(pathname).isDirectory()) {
        pathname += "index.html";
      }

      // read file from file system
      fs.readFile(pathname, function(err, data) {
        if (err) {
          res.statusCode = 500;
          res.end(`Error getting the file: ${err}.`);
        } else {
          // if the file is found, set Content-type and send data
          res.setHeader("Content-type", map[ext] || "text/html");
          res.end(data);
        }
      });
    });
  })
  .listen(8080);

console.log(`Server listening on port 8080`);
opn("http://localhost:" + 8080);
