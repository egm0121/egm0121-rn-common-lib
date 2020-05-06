const FILE = 'rn-common-lib/helpers/SharedInterval';
export default class SharedInterval {
  cbArr = [];
  constructor(millis) {
    this.intervalMs = millis;
    console.log({ FILE, millis }, 'SharedInterval created');
  }
  register(fn) {
    console.log({ FILE }, 'register fn');
    if (!this.cbArr.length) this.startInterval();
    this.cbArr.push(fn);
    return () => this.unregister(fn);
  }
  unregister(fn) {
    console.log({ FILE }, 'unregister fn');
    this.cbArr = this.cbArr.filter(curr => curr !== fn);
    if (!this.cbArr.length) this.endInterval();
  }
  onTick = () => {
    this.cbArr.forEach(cb => cb());
  };
  startInterval() {
    console.log({ FILE }, 'start interval');
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(this.onTick, this.intervalMs);
  }
  endInterval() {
    console.log({ FILE }, 'end interval');
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }
}