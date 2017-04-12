/**
 * Created by milad on 4/11/17.
 */
import { RelayConnection } from './RelayConnection';
import {socks} from 'socksv5';
import {fs} from 'fs';
//const fs = require('fs');
//const socks = require('socksv5');

/* const con = new RelayConnection('localhost', 8000, fs.readFileSync('../test-certs/relay-cert.pem'), (pkt) => {
 console.log(pkt);
 }, () => {});
 */
export function startClientSocks() {
  console.log('HERE');

  const srv = socks.createServer((info, accept, deny) => {
    let socket;
    if (socket = accept(true)) {
      socket.on('data', (data) => {
        console.log(data);
      });
    }
  });
  srv.listen(1080, 'localhost', () => {
    console.log('SOCKS server listening on port 1080');
  });

  srv.useAuth(socks.auth.None());
}
