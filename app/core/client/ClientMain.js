/**
 * Created by milad on 4/11/17.
 */
import {startClientSocks} from './ClientSocks';
import {Conmgr} from './ConnectionManager';
import {RelayConnection} from './RelayConnection'
export function startClient() {
  startClientSocks();
  Conmgr.newRelayConnection('127.0.0.1',8040,'');
  //Conmgr.connectionClose();


}
