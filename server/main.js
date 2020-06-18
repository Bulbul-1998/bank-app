const path = require('path');
const express = require('express');
const jsonserver = require('json-server');
const app = express();
const PORT = 3030;

app.use(express.json());

app.use('/res', express.static(path.resolve(__dirname, "../public/res/")));

app.use("/api", jsonserver.router(path.resolve(__dirname, "./json/db.json")));

app.get('/js/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/js/' + req.params.filename));
});

app.get('/style/:filename', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/css/' + req.params.filename));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log("listening at PORT:" + PORT);
});