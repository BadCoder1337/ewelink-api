const { NotFoundError } = require('../../lib/errors');

const getDeviceMixin = {
  /**
   * Get information about all associated devices to account
   *
   * @param deviceId
   *
   * @returns {Promise<{msg: string, error: *}>}
   */
  async getDevice(deviceId) {
    if (this.devicesCache) {
      return this.devicesCache.find(dev => dev.deviceid === deviceId) || null;
    }

    const devices = await this.getDevices();

    const device = devices.find(dev => dev.deviceid === deviceId);

    if (!device) {
      throw new NotFoundError('Device does not exist', 404);
    }

    return device;
  },
};

module.exports = getDeviceMixin;
