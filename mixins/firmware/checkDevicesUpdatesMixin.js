const { _get } = require('../../lib/helpers');
const payloads = require('../../lib/payloads');
const { ServerError } = require('../../lib/errors');

const checkDevicesUpdatesMixin = {
  async checkDevicesUpdates() {
    const devices = await this.getDevices();

    const deviceInfoList = payloads.firmwareUpdate(devices);

    if (!deviceInfoList.length) {
      return [];
    }

    const updates = await this.makeRequest({
      method: 'POST',
      url: this.getOtaUrl(),
      uri: '/app',
      body: { deviceInfoList },
    });

    const upgradeInfoList = _get(updates, 'upgradeInfoList', false);

    if (!Array.isArray(upgradeInfoList)) {
      throw new ServerError("Can't find firmware update information");
    }

    return upgradeInfoList.map(device => {
      const upd = _get(device, 'version', false);

      if (!upd) {
        return {
          deviceId: device.deviceid,
          msg: 'No update available',
        };
      }

      return {
        deviceId: device.deviceid,
        msg: 'Update available',
        version: upd,
      };
    });
  },
};

module.exports = checkDevicesUpdatesMixin;
