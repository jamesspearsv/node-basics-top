const http = require('node:http');
const fs = require('node:fs');

const HOSTNAME = 'localhost';
const PORT = 8080;

const SERVER = http.createServer((req, res) => {
  const fileName = `./pages${req.url === '/' ? '/index' : req.url}.html`;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      // console.error(err.message);
      const dateTime = new Date();
      const logMessage = `\n${dateTime} -- ${err.message}\n`;
      fs.appendFile('error.log', logMessage, (err) => {
        return;
      });
      res.writeHead(404, {
        'Content-Type': 'text/html',
      });
      res.write('404 -- not found');
      return res.end();
    }

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    res.write(data);
    res.end;
  });
});

SERVER.listen(PORT, HOSTNAME, () => {
  console.log(`server started on ${HOSTNAME}:${PORT}`);
});
