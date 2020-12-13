type AnalyticsServiceOptions = {
  uniqueClientId: string,
  userAgent: string,
  deviceModelName: string,
  deviceModelId: string,
  appReadableVersion: string,
  appBundleId: string,
  deviceNameCustomDimensionIdx?: number,
  deviceIdCustomDimensionIdx ?: number,
};
type AnalyticsServiceDimensions = {
  [key: string] : string  
}
type AnalyticsServiceEvent = {
  category?: string,
  action: string,
  label: string,
  value?: number  
  dimensions?: AnalyticsServiceDimensions,
};
interface AnalyticsService {
  initialize(trackerId: string, appName:string, config: AnalyticsServiceOptions) : void;
  addSessionDimension(index:number, value:string): void;
  removeSessionDimension(index: number): void;
  getCurrentDeepScreenView():string;
  sendScreenView(screenName: string): void;
  sendNestedScreenView(subViewName: string, async?: bool);
  sendEvent(eventPayload: AnalyticsServiceEvent) :void 
};
declare const service: AnalyticsService;
export default service;
