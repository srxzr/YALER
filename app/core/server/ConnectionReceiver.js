/**
 * Created by milad on 4/12/17.
 */
import  {policy} from './Policer';
const net = require('net');
const jspack = require('jspack');
export class ConnectionReceiver {
  constructor(socket) {
    this.socket = socket;

    this.socket.on('data', (data) => {
      this.onData(data);
    });
    this.carrylen = 0;
    this.carry = '';
    this.lastcommand = '';
    this.lastconid = '';
    this.lastsize = 0;
    this.newconcarry = '';
    this.connections = {}
  }

  write(conid, command, data) {

    let sendpacket = Buffer(7);
    sendpacket.writeUInt16BE(conid);
    sendpacket.write(command, 2);
    sendpacket.writeUInt32BE(data.length, 3);
    const b = Buffer.concat([sendpacket, data]);
    this.socket.write(b);
  }

  newConnection(ip, port, conid) {
    try {


      if (policy.checkDestination(ip, port)) {

        this.connections[conid] = net.connect(ip, port, () => {
          this.write(conid, 'N', Buffer(ip + ':' + String(port)));
        });
        this.connections[conid].on('data', (data) => {
          this.write(conid, 'D', data);
        });
        this.connections[conid].on('end', () => {
          this.write(conid, 'C', Buffer(ip + ':' + String(port)));
          delete this.connections[conid];
        });
        this.connections[conid].on('error', () => {
          this.write(conid, 'C', Buffer(ip + ':' + String(port)));
          delete this.connections[conid];
        });


      }
    } catch (err) {
      this.write(conid, 'C', Buffer(ip + ':' + String(port)));
      console.debug(err);
    }
  }

  commandParser(lastconid, CMD, size, data) {
    if (CMD === 'N') {
      data = String(data);
      if (data.length === size) {
        const sp = data.split(':');
        const ip = sp[0];
        const port = sp[1];
        console.log('CREATE CONNECTION', ip, port);
        this.newconcarry = '';
        this.newConnection(ip, port, lastconid);
      } else {
        this.newconcarry += data;
        if (this.newconcarry.length === size) {
          const sp = this.newconcarry.split(':');
          const ip = sp[0];
          const port = sp[1];
          console.log('CREATE CONNECTION', ip, port);
          this.newConnection(ip, port, lastconid);


        }
      }
    }
    if (CMD === 'D') {
      if (lastconid in this.connections) {
        this.connections[lastconid].write(data);
      }
    }
    if (CMD === 'C') {
      this.connections[lastconid].end();
    }
  }


  onData(data) {
    while (data) {
      if (this.carrylen > 0) {
        if (data.length <= this.carrylen) {
          this.commandParser(this.lastconid, this.lastcommand, this.lastsize, data);
          this.carrylen -= data.length;
          break;
        } else {
          this.commandParser(this.lastconid, this.lastcommand, this.lastsize, data.slice(0, this.carrylen));

          data = data.slice(this.carrylen);
          this.carrylen = 0;
        }


      }
      else {
        if (this.carry) {
          data = Buffer(this.carry + data);
        }
        if (data.length < 7) {
          this.carry = data;
        }

        this.lastconid = data.readUInt16BE(0);
        this.lastcommand = data.toString('ascii', 2, 3);

        this.carrylen = data.readUInt32BE(3);
        this.lastsize = this.carrylen;

        console.log(data, String(data), this.lastconid, this.lastsize, this.lastcommand);


        if ((data.length - 7) <= this.carrylen) {
          this.commandParser(this.lastconid, this.lastcommand, this.lastsize, data.slice(7));
          this.carrylen -= (data.length - 7);
          break;
        } else {
          this.commandParser(this.lastconid, this.lastcommand, this.lastsize, data.slice(7, this.carrylen + 7));
          this.carrylen -= 0;
          data = data.slice(this.carrylen + 7);
        }


      }
    }

  }
}
