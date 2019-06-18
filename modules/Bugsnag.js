import { Client } from 'bugsnag-react-native';

export default {
  init(client_id){
    this.client = new Client(client_id);
  },
  getClient(){
   return this.client; 
  },
  notify(...args){
    return this.client.notify(...args);
  }
}