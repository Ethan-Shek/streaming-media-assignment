const fs = require('fs');
const path = require('path');

const getIndex = (req, res) => {
  const filePath = path.resolve(__dirname, '../client/client1.html');
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(content);
};

const getPage2 = (req, res) => {
  const filePath = path.resolve(__dirname, '../client/client2.html');
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(content);
};

const getPage3 = (req, res) => {
  const filePath = path.resolve(__dirname, '../client/client3.html');
  const content = fs.readFileSync(filePath);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(content);
};

module.exports = { getIndex, getPage2, getPage3 };
