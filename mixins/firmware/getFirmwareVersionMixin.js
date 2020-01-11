const { _get } = require('../../lib/helpers');
const { NotFoundError } = require('../../lib/errors');

const getFirmwareVersionMixin = {
  /**
   * Get device firmware version
   *
   * @param deviceId
   *
   * @returns {Promise<{fwVersion: *, status: string}|{msg: string, error: *}>}
   */
  async getFirmwareVersion(deviceId) {
    const device = await this.getDevice(deviceId);
    const fwVersion = _get(device, 'params.fwVersion', false);

    if (!fwVersion) {
      throw new NotFoundError('Device does not exist', 404);
    }

    return { fwVersion };
  },
};

module.exports = getFirmwareVersionMixin;
