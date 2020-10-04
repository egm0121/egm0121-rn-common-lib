/* global __DEV__ */
export const logBuffer = [];
let originalMethods;

function serializeInfo(...args) {
  const MAX_STR_LEN = 200;
  const serializedArr = args.map((value) => {
    if (value === undefined) return value;
    if (value === null) return value;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'number') return value;
    if (typeof value === 'object') {
      if (value && value instanceof Error) {
        return `${value.message} ${value.stack}`;
      }
      // eslint-disable-next-line no-confusing-arrow
      return JSON.parse(JSON.stringify(value, (k, v) => {
        if (typeof v === 'function') return v.toString().substr(0, 100);
        return k && v && !(typeof v in { number: 1, boolean: 1 }) ? `${v}`.substr(0, MAX_STR_LEN) : v;
      }));
    }
    return value.toString().substr(0, MAX_STR_LEN);
  });
  return JSON.stringify([new Date().toISOString(), ...serializedArr]);
}
function serializeAndBufferLog(bufferSize, type) {
  return (...args) => {
    let serializedPayload;
    try {
      serializedPayload = serializeInfo(...[type, ...args]);
      logBuffer.push(serializedPayload);
    } catch (err) {
      originalMethods.warn('failed to serialize log');
    }
    if (logBuffer.length > bufferSize) {
      logBuffer.shift();
    }
    if (__DEV__) {
      originalMethods[type](serializedPayload);
    }
  };
}
export function getBufferedLogs() {
  return logBuffer;
}
export function bufferLogsInProduction(bufferSize) {
  originalMethods = {
    log: console.log.bind(console),
    info: console.info.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };
  console.log = serializeAndBufferLog(bufferSize, 'log');
  console.info = serializeAndBufferLog(bufferSize, 'info');
  console.warn = serializeAndBufferLog(bufferSize, 'warn');
  console.error = serializeAndBufferLog(bufferSize, 'error');
}
