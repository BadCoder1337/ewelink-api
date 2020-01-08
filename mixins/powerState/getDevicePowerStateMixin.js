const { _get } = require('../../lib/helpers');

const { getDeviceChannelCount } = require('../../lib/ewelink-helper');

const getDevicePowerStateMixin = {
  /**
   * Get current power state for a specific device
   *
   * @param deviceId
   * @param channel
   *
   * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
   */
  async getDevicePowerState(deviceId, channel = 0) {
    const device = await this.getDevice(deviceId);
    const error = _get(device, 'error', false);
    const uiid = _get(device, 'extra.extra.uiid', false);

    let state = _get(device, 'params.switch', false);
    const switches = _get(device, 'params.switches', false);

    const switchesAmount = getDeviceChannelCount(uiid);

    if (switchesAmount > 0 && switchesAmount <= channel) {
      throw { error, msg: 'Device channel does not exist' };
    }

    if (error || (!state && !switches)) {
      if (error && parseInt(error) === 401) {
        return device;
      }
      throw { error, msg: 'Device does not exist' };
    }

    if (switches) {
      state = switches[channel].switch;
    }

    return { state };
  },
};

module.exports = getDevicePowerStateMixin;
