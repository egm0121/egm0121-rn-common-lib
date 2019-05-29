export function stripSSL(url){
  return url ? url.replace(/^(https)/,'http') : url;
}
export function toArray(arr){
  return arr && Array.isArray(arr) ? arr : []
}

var proto = Object.prototype;
var gpo = Object.getPrototypeOf;

export function isPojo (obj) {
  if (obj === null || typeof obj !== "object") {
    return false;
  }
  return gpo(obj) === proto;
}