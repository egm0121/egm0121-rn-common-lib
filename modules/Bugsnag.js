import { Client, Configuration } from 'bugsnag-react-native';

export default {
  init(client_id){
    const bsConfiguration = new Configuration();
    bsConfiguration.apiKey = client_id;
    bsConfiguration.registerBeforeSendCallback(this.enhanceErrorReport.bind(this));
    this.client = new Client(bsConfiguration);
    this.errorMetadataCb = () => ({});
  },
  enhanceErrorReport(report, error) {
    try {
      report.metadata = report.metadata || {};
      // handle axios failed request errors
      if (error.config && typeof error.config === 'object') {
        // eslint-disable-next-line no-param-reassign
        report.metadata.axios = {
          url: error.config.url,
          params: error.config.params,
          method: error.config.method,
        };
      } 
      const extraData = this.errorMetadataCb(report, error);
      Object.keys(extraData).forEach(dataKey => {
        report.metadata[dataKey] = extraData[dataKey];
      });
    } catch (err) {
      console.log('bugsnag failed enhancing of error');
      return true;
    }
    return true;
  },
  getClient(){
   return this.client; 
  },
  setErrorMetadataCallback(fn){
    this.errorMetadataCb = fn;
  },
  notify(...args){
    return this.client.notify(...args);
  }
}