import { isPojo } from './utils';

export function CacheDecorator() {
  let that = this;
  this.fnCache = {};
  this.expiryMap = {};
  this.uniqFuncId = 0;
  /* private helpers */
  let isObject = (value) => value !== null && typeof value === 'object';
  let copy = (v) => JSON.parse(JSON.stringify(v));
  let getUniqCacheId = () => 'int-id-'+(this.uniqFuncId++);
  let isPromiseLike = (prom) => {
    return prom && isObject(prom) && 'then' in prom;
  };

  let breakObjectReferences = function(prom){
    if( isPromiseLike(prom) ){
      return new Promise((res,rej) => {
        prom.then((value) => {
          let originalPayload = value;
          let cloned = copy(originalPayload);
          res(cloned);
        }).catch(rej);
      });
    }

    if( isObject(prom) ){
      return copy(prom);
    }
      //if it's simple value
    return prom;
  };
  let argsSerializer = (e) => {
    if(e === undefined || e === null ) return 'null';
    if(isObject(e) && !isPojo(e))return '';
    return isObject(e) ? JSON.stringify(e) : e.toString();
  };
  let startsWith = (ns) => (i) => ns.indexOf(i) === 0;
  let findBy = (ns) => (i) => ns === i;
  let not = (fn) => (...args) => !fn(...args);

  this.getInternalCache = function(){
    return this.fnCache;
  }

  this.setInternalCache = function(arrStorage){
    return this.fnCache = arrStorage;
  }

  this.getCache = function(key){
    const keyExpiry = this.expiryMap[key];
    if (keyExpiry && Date.now() > keyExpiry) {
      console.log('expired key , will delete', key);
      delete this.expiryMap[key];
      this.delCache(key);
      return false;
    }
    return key in  this.fnCache ?  this.fnCache[key] : false;
  };

  this.setCache = function(key,val,timeout = 0){
    if(parseInt(timeout) > 0){
      this.expiryMap[key] = Date.now() + timeout; 
    }
    return this.fnCache[key] = val;
  };

  this.delCache = function(namespace){
    var that = this;
    var invalidKeys  = [];
    if(namespace != '*'){
      Object.keys(this.fnCache).forEach((k) => {
        if(k.indexOf(namespace) === 0)invalidKeys.push(k);
      });
    } else {
      invalidKeys = Object.keys(this.fnCache);
    }
    invalidKeys.map((key) => {
      that.fnCache[key] = undefined;
      delete that.fnCache[key];
    });
  };

  this.withCache = function(func, explicitId, timeout, returnClones = false, serializer = argsSerializer){
    let id = explicitId || getUniqCacheId();

    return (...args) => {
      let key = id + '-' + args.map(serializer).join('-');
      let cachedVal = that.getCache(key);

      if (!cachedVal){
          //cache the original
        console.log('cacheDecorator','cache miss for key : ' + key);
        cachedVal = func(...args);
        if(isPromiseLike(cachedVal)){
          cachedVal.then(() => {
            this.setCache(key,cachedVal,timeout);
          }).
          catch(() => console.log('rejected promise, will not cache',key)); 
        }
      } else {
        console.log('cacheDecorator','cache hit for key : ' + key);
      }
      //breakObjectReferences, on promise or object will
      //return a copy of the cached value
      //so that the original reference to the cached object doesn't leak.
      let valueOrPromise = returnClones ? breakObjectReferences(cachedVal) : cachedVal;
      return valueOrPromise;
    };
  };
}

let cacheInstance = new CacheDecorator();

export default cacheInstance;
