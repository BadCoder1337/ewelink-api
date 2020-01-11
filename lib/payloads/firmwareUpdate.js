const { _get } = require('../../lib/helpers');

const firmwareUpdate = devicesList =>
  devicesList
    .map(device => {
      const model = _get(device, 'extra.extra.model', false);
      const fwVersion = _get(device, 'params.fwVersion', false);

      if (!model || !fwVersion) {
        return null;
      }

      return { model, version: fwVersion, deviceid: device.deviceid };
    })
    .filter(Boolean);

module.exports = firmwareUpdate;
