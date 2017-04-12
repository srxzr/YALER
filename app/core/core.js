import { increment } from '../actions/counter';
import { runtestserver } from './server/Receiver';
import { startClientSocks } from './client/Client';
export class YalerCore {
  store;

  constructor(store) {
    this.store = store;
  }

  start() {
    console.log(' test2');
    // runtestserver();
    startClientSocks();
    // setInterval(() => {
    //   this.store.dispatch(increment());
    // }, 1000)
  }
}

