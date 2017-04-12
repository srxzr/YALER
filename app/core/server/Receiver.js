/**
 * Created by milad on 4/11/17.
 */
const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../certs/relay-key.pem'),
  cert: fs.readFileSync('../certs/relay-cert.pem'),
  rejectUnauthorized: false,
  // This is necessary only if using the client certificate authentication.
  requestCert: false


};

const server = tls.createServer(options,function (socket){
  console.log('server connected',
    socket.authorized ? 'authorized' : 'unauthorized');
  socket.write('welcome!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});




server.listen(8000, function() {
  console.log('server bound');
});
