const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/party.mp4':
      return mediaHandler.getParty(request, response);
    case '/bling.mp3':
      return mediaHandler.getBling(request, response);
    case '/bird.mp4':
      return mediaHandler.getBird(request, response);
    case '/page2':
      return htmlHandler.getPage2(request, response);
    case '/page3':
      return htmlHandler.getPage3(request, response);
    default:
      return htmlHandler.getIndex(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
