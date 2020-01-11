const { _get } = require('../../lib/helpers');

const { getDeviceChannelCount } = require('../../lib/ewelink-helper');

const getDeviceChannelCountMixin = {
  /**
   * Get device channel count
   *
   * @param deviceId
   *
   * @returns {Promise<{switchesAmount: *, status: string}|{msg: string, error: *}>}
   */
  async getDeviceChannelCount(deviceId) {
    const device = await this.getDevice(deviceId);
    const uiid = _get(device, 'extra.extra.uiid', false);
    const switchesAmount = getDeviceChannelCount(uiid);

    return { switchesAmount };
  },
};

module.exports = getDeviceChannelCountMixin;
