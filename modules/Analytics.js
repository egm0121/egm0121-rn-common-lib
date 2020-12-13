import {
  Analytics,
  Hits as GAHits
} from 'react-native-google-analytics';


let AnalyticsService = {
  ga : null,
  initialBuffer : [],
  initialize(trackerId, appName, config){
    this.uniqueClientId = config.uniqueClientId;
    this.trackingAppName = appName;
    this.config = config;
    this.currentRootScreen = ''; 
    this.currentSubScreen = '';
    this.ga = new Analytics(trackerId, this.uniqueClientId, 1, this.config.userAgent);
    this.processPrematureHitsQueue();
    const deviceName = this.config.deviceModelName.toLocaleLowerCase() !== 'iphone' 
      ? this.config.deviceModelName : this.config.deviceModelId;
    console.log('analytics detected deviceName:', deviceName, 'uid:', this.uniqueClientId);
    if (this.config.deviceNameCustomDimensionIdx >= 0) {
      console.log('Include tracking of device Name via custom dimension');
      this.addSessionDimension(this.config.deviceNameCustomDimensionIdx, deviceName);
    }
    if (this.config.deviceIdCustomDimensionIdx >= 0){
      console.log('Include tracking of unique device id via custom dimension');
      this.addSessionDimension(this.config.deviceIdCustomDimensionIdx, this.uniqueCliendId);
    }
  },
  addSessionDimension(index,value){
    return this.ga.addDimension(index,value);
  },
  removeSessionDimension(index){
    return this.ga.removeDimension(index);
  },
  getCurrentDeepScreenView(){
    if (!this.currentSubScreen) return this.currentRootScreen;
    return [this.currentRootScreen, this.currentSubScreen].join(' - ');
  },
  sendScreenView(screenName){
    this.currentRootScreen = screenName;
    this.currentSubScreen = '';
    if(!this.ga){
      this.initialBuffer.push(() => this.sendScreenView(screenName));
      return false;
    }
    let screenView = new GAHits.ScreenView(
      this.trackingAppName,
      screenName,
      this.config.appReadableVersion,
      this.config.appBundleId
    );
    this.ga.send(screenView);
  },
  sendNestedScreenView(subView, async = false) {
    this.currentSubScreen = subView;
    let screenName = this.getCurrentDeepScreenView();
    let screenView = new GAHits.ScreenView(
      this.trackingAppName,
      screenName,
      this.config.appReadableVersion,
      this.config.appBundleId
    );
    if (async) { 
      setTimeout(() => this.ga.send(screenView),500);
    } else {
      this.ga.send(screenView);
    }
  },
  sendEvent({category,action,label,value,dimensions}){
    if(!this.ga){
      this.initialBuffer.push(
        () => this.sendEvent({category,action,label,value,dimensions})
      );
      return false;
    }
    label = (label || `${category} - ${action}`).substr(0,250);
    let eventHit = new GAHits.Event(category,action,label,value);
    if(typeof dimensions == 'object'){
      eventHit.set(dimensions);
      __DEV__ && console.log('Serialized ga event',eventHit.toQueryString());
    }
    this.ga.send(eventHit);
  },
  processPrematureHitsQueue(){
    if(this.initialBuffer.length){
      console.log('processing early ga Hits');
    }
    this.initialBuffer.forEach((dispatchHit) => dispatchHit());
    this.initialBuffer = [];
  }
}
export default AnalyticsService;