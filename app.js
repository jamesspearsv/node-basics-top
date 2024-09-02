import fs from 'fs';
import express from 'express';
import path from 'path';

const PORT = 3000;

const options = {
  root: path.resolve(),
};

// Init express server
const app = express();

app.get('*', (req, res) => {
  // Parse requested file name
  const fileName = req.url === '/' ? 'index.html' : `${req.url}.html`;

  //   Attempt to read requested file
  fs.readFile(`./pages/${fileName}`, 'utf-8', (err) => {
    if (err) {
      res.status(404).sendFile('./pages/404.html', options);
    } else {
      res.status(200).sendFile(`./pages/${fileName}`, options);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
