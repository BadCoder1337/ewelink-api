const { makeFakeIMEI } = require('../../lib/ewelink-helper');
const { _get } = require('../../lib/helpers');
const { AuthError, NotFoundError } = require('../../lib/errors');

const getDevicesMixin = {
  /**
   * Get all devices information
   *
   * @returns {Promise<{msg: string, error: number}|*>}
   */
  async getDevices() {
    const timeStamp = new Date() / 1000;
    const ts = Math.floor(timeStamp);

    const response = await this.makeRequest({
      uri: '/user/device',
      qs: {
        lang: 'en',
        getTags: 1,
        version: 6,
        ts,
        appid: 'oeVkj2lYFGnJu5XUtWisfW4utiN4u9Mq',
        imei: makeFakeIMEI(),
        os: 'android',
        model: '',
        romVersion: '',
        appVersion: '3.12.0',
      },
    });

    const error = _get(response, 'error', false);
    const devicelist = _get(response, 'devicelist', false);

    if (error === 406) {
      throw new AuthError('Authentication error', 401);
    }

    if (!Array.isArray(devicelist)) {
      throw new NotFoundError('No devices found', 500);
    }

    return devicelist;
  },
};

module.exports = getDevicesMixin;
