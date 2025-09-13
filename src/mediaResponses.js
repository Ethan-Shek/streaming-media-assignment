const fs = require('fs');
const path = require('path');

const streamFile = (request, response, filePath, contentType) => {
  const resolvedPath = path.resolve(__dirname, filePath);

  fs.stat(resolvedPath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('File not found');
        return;
      }
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end(err.toString());
      return;
    }

    let { range } = request.headers;
    if (!range) {
      range = 'bytes=0-';
    }

    const positions = range.replace(/bytes=/, '').split('-');
    let start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunksize = (end - start) + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    };

    response.writeHead(206, headers);

    const stream = fs.createReadStream(resolvedPath, { start, end });
    stream.pipe(response);
    stream.on('error', (streamErr) => response.end(streamErr));
  });
};

const getParty = (req, res) => streamFile(req, res, '../client/party.mp4', 'video/mp4');
const getBling = (req, res) => streamFile(req, res, '../client/bling.mp3', 'audio/mpeg');
const getBird = (req, res) => streamFile(req, res, '../client/bird.mp4', 'video/mp4');

module.exports = {
  getParty,
  getBling,
  getBird,
};
