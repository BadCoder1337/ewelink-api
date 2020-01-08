const { _get } = require('../../lib/helpers');

const { getDeviceChannelCount } = require('../../lib/ewelink-helper');
const {
  ChangeState,
  ChangeStateZeroconf,
} = require('../../classes/PowerState');

const setDevicePowerState = {
  /**
   * Change power state for a specific device
   *
   * @param deviceId
   * @param state
   * @param channel
   *
   * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
   */
  async setDevicePowerState(deviceId, state, channel) {
    const device = await this.getDevice(deviceId);
    const deviceApiKey = _get(device, 'apikey', false);
    const error = _get(device, 'error', false);
    const uiid = _get(device, 'extra.extra.uiid', false);

    let status = _get(device, 'params.switch', false);
    const switches = _get(device, 'params.switches', false);

    const switchesAmount = getDeviceChannelCount(uiid);

    if (typeof channel === 'number' && switchesAmount > 0 && switchesAmount <= channel) {
      throw { error, msg: 'Device channel does not exist' };
    }

    if (error || (!status && !switches)) {
      if (error && parseInt(error) === 401) {
        return device;
      }
      throw { error, msg: 'Device does not exist' };
    }

    const params = {};

    if (switches) {
      if (typeof channel === 'number') {
        switches[channel].switch = state !== 'toggle'
          ? state
          : switches[channel].switch === 'on' ? 'off' : 'on'
        params.switches = switches;
      } else {
        params.switches = switches.map(s => s.switch =
          state !== 'toggle'
            ? state
            : s.switch === 'on' ? 'off' : 'on'
        );
      }
    } else {
      params.switch = state !== 'toggle'
          ? state
          : status === 'on' ? 'off' : 'on'
    }

    let stateToSwitch = typeof channel !== 'number'
      ? status && [{ switch: params.switch }] || params.switches
      : status && { switch: params.switch } || params.switches[channel];

    if (this.devicesCache) {
      return ChangeStateZeroconf.set({
        url: this.getZeroconfUrl(device),
        device,
        params,
        switches,
        state: stateToSwitch,
      });
    }

    const actionParams = {
      apiUrl: this.getApiWebSocket(),
      at: this.at,
      apiKey: this.apiKey,
      deviceId,
      params,
      state: stateToSwitch,
    };

    if (this.apiKey !== deviceApiKey) {
      actionParams.apiKey = deviceApiKey;
    }

    return ChangeState.set(actionParams);
  },
};

module.exports = setDevicePowerState;
