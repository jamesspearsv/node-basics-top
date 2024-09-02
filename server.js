const http = require('node:http');
const fs = require('node:fs');

const HOSTNAME = 'localhost';
const PORT = 8080;

function return404(err, res) {
  const dateTime = new Date();
  const logMessage = `\n${dateTime} -- ${err.message}\n`;

  fs.appendFile('error.log', logMessage, (err) => console.error(err));

  fs.readFile('./pages/404.html', 'utf-8', (err, data) => {
    if (err) {
      return;
    } else {
      res.writeHead(404, {
        'Content-Type': 'text/html',
      });

      res.write(data);
      return res.end();
    }
  });
}

const SERVER = http.createServer((req, res) => {
  const fileName = `./pages${req.url === '/' ? '/index' : req.url}.html`;

  fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return404(err, res);
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });

      res.write(data);
      return res.end();
    }
  });
});

SERVER.listen(PORT, HOSTNAME, () => {
  console.log(`server started on ${HOSTNAME}:${PORT}`);
});
