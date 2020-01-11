const { _get } = require('../../lib/helpers');
const payloads = require('../../lib/payloads');

const checkDeviceUpdateMixin = {
  /**
   * Check device firmware update
   *
   * @param deviceId
   *
   * @returns {Promise<{msg: string, version: *}|{msg: string, error: number}|{msg: string, error: *}|Device|{msg: string}>}
   */
  async checkDeviceUpdate(deviceId) {
    const device = await this.getDevice(deviceId);

    const deviceInfoList = payloads.firmwareUpdate([device]);

    if (!deviceInfoList.length) {
      return { msg: 'No update available' };
    }

    const update = await this.makeRequest({
      method: 'POST',
      url: this.getOtaUrl(),
      uri: '/app',
      body: { deviceInfoList },
    });

    const isUpdate = _get(update, 'upgradeInfoList.0.version', false);

    if (!isUpdate) {
      return { msg: 'No update available' };
    }

    return {
      msg: 'Update available',
      version: isUpdate,
    };
  },
};

module.exports = checkDeviceUpdateMixin;
