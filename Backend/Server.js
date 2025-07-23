const http = require('http');
const app = require('./App');
const socketHandler = require('./Socket/SocketHandler');

const server = http.createServer(app);
socketHandler(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
