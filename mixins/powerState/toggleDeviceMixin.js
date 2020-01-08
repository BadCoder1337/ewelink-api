const toggleDeviceMixin = {
  /**
   * Toggle power state for a specific device
   *
   * @param deviceId
   * @param channel
   *
   * @returns {Promise<{state: *, status: string}|{msg: string, error: *}>}
   */
  async toggleDevice(deviceId, channel) {
    return this.setDevicePowerState(deviceId, 'toggle', channel);
  },
};

module.exports = toggleDeviceMixin;
