import { Client, Configuration } from 'bugsnag-react-native';

export default {
  init(client_id){
    const bsConfiguration = new Configuration();
    bsConfiguration.apiKey = client_id;
    bsConfiguration.registerBeforeSendCallback((report, error) => {
      try {
        if (error.config && typeof error.config === 'object') {
          // eslint-disable-next-line no-param-reassign
          report.metadata = {
            axios: {
              url: error.config.url,
              params: error.config.params,
              method: error.config.method,
            },
          };
        }
      } catch (err) {
        console.log('bugsnag failed enhancing of error');
        return true;
      }
      return true;
    });
    this.client = new Client(bsConfiguration);
  },
  getClient(){
   return this.client; 
  },
  notify(...args){
    return this.client.notify(...args);
  }
}