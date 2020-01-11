const fs = require('fs');
const { FileError } = require('../../lib/errors');

const saveDevicesCacheMixin = {
  /**
   * Save devices cache file (useful for using zeroconf)
   * @returns {Promise<string|{msg: string, error: number}|*|Device[]|{msg: string, error: number}>}
   */
  async saveDevicesCache(fileName = './devices-cache.json') {
    const devices = await this.getDevices();

    const jsonContent = JSON.stringify(devices, null, 2);

    try {
      fs.writeFileSync(fileName, jsonContent, 'utf8');
      return { file: fileName };
    } catch (e) {
      throw new FileError(
        `An error occured while writing JSON Object to File.: [${e.name}] {${e.message}}`
      );
    }
  },
};

module.exports = saveDevicesCacheMixin;
