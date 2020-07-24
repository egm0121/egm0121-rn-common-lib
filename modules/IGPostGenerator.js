import axios from 'axios';

class IGPostGenerator {
  constructor({ apiKey }) {
    this.apiBase = 'https://api.rasterwise.com/v1';
    this.apiKey = apiKey;
  }

  async getScreenshot(url, width, height) {
    const screenshotURL = `${this.apiBase}/get-screenshot?apikey=${
      this.apiKey
    }&url=${encodeURIComponent(url)}&height=${height}&width=${width}`;
    console.log('getting screenshot from service', url);
    const screenshotResp = await axios({ method: 'GET', url: screenshotURL });
    console.log('got screenshot data from service', screenshotResp.data);
    const scImagePath = screenshotResp.data.screenshotImage;
    return axios({ method: 'GET', responseType: 'arraybuffer', url: scImagePath });
  }

  async generateYearWrappedPost(year, deviceId, side) {
    return this.getScreenshot(
      `http://www.splitcloud-app.com/wrapped.html?id=${deviceId}&year=${year}&side=${side}&t=4`,
      540,
      960
    );
  }

  async fetchTrendingForCountry(countryCode) {
    return this.getScreenshot(
      `http://www.splitcloud-app.com/chartPostGenerator.html?region=${countryCode}&kind=trending`,
      1080,
      1350
    );
  }

  async fetchPopularForCountry(countryCode) {
    return this.getScreenshot(
      `http://www.splitcloud-app.com/chartPostGenerator.html?region=${countryCode}&kind=popular`,
      1080,
      1350
    );
  }
  async generateSoundCloudTrackStory(scTrackId){
    return this.getScreenshot(
      `http://www.splitcloud-app.com/sc_story.html?id=${scTrackId}`,
      540,
      960,
    );
  }
  async generateTrendingPostsForCountries(countryCodeArr) {
    const screenshotsPromises = countryCodeArr.map(countryCode =>
      this.fetchTrendingForCountry(countryCode).then(imageResp => ({
        blob: imageResp.data,
        countryCode,
      }))
    );
    return Promise.all(screenshotsPromises);
  }
}

export default IGPostGenerator;