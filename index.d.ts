// Type definitions for ewelink-api
// Definitions by: Alexander Méhes https://github.com/BMXsanko

declare module 'ewelink-api' {
  // export default eWelink;

  type ConstructorArg =
    { email: string; password: string; region?: string }
    | { devicesCache: IDevice[]; }
    | { arpTable: Array<{ ip: string; mac: string }> }
    | { at: string }

  export class eWeLink {
    constructor({ }: ConstructorArg);
    /**
     * Generate eWeLink API URL
     */
    getApiUrl(): string;
    /**
     * Generate eWeLink OTA API URL
     */
    getOtaUrl(): string;
    /**
     * Generate eWeLink WebSocket URL
     */
    getApiWebSocket(): string;
    /**
     * Generate Zeroconf URL
     */
    getZeroconfUrl(device: IDevice): string;
    /**
    * Opens a socket connection to eWeLink and listen for real-time events.
    */
    openWebSocket(callback: (data: {}) => void): Promise<any>
    /**
     * Returns a list of devices associated to logged account.
     */
    getDevices(): Promise<IDevice[]>
    /**
     * Return information for specified device.
     */
    getDevice(deviceId: string): Promise<IDevice>
    /**
     * Query for specified device power status.
     */
    getDevicePowerState(deviceId: string): Promise<IDeviceState[]>
    getDevicePowerState(deviceId: string, channel: number): Promise<IDeviceState>
    /**
     * Change specified device power state.
     */
    setDevicePowerState(deviceId: string, state: string): Promise<IDeviceState[]>
    setDevicePowerState(deviceId: string, state: string, channel: number): Promise<IDeviceState>
    /**
     * Switch specified device current power state.
     */
    toggleDevice(deviceId: string): Promise<IDeviceState[]>
    toggleDevice(deviceId: string, channel: number): Promise<IDeviceState>
    /**
     * Returns current month power usage on device who supports electricity records, like Sonoff POW.
     */
    getDevicePowerUsage(deviceId: string): Promise<IPowerUsage>
    /**
     * Return current temperature and humidity for specified device.
     */
    getDeviceCurrentTH(deviceId: string): Promise<ITemperatureHumidity>
    /**
     * Return current temperature for specified device.
     */
    getDeviceCurrentTemperature(deviceId: string): Promise<ITemperatureHumidity>
    /**
     * Return current temperature for specified device.
     */
    getDeviceCurrentHumidity(deviceId: string): Promise<ITemperatureHumidity>
    /**
     * Return total channels for specified device.
     */
    getDeviceChannelCount(deviceId: string): Promise<ISwitchCount>
    /**
     * Return firmware version for specified device.
     */
    getFirmwareVersion(deviceId: string): Promise<IFirmwareVersion>

    checkDevicesUpdates(): Promise<Array<IDeviceUpdate & { deviceId: string }>>
    checkDeviceUpdate(deviceId: string): Promise<IDeviceUpdate>
  }

  export class Zeroconf {
    static getArpTable(ip: string): Promise<IHost[]>
    static fixMacAddresses(hosts: string[]): IHost[]
    static saveArpTable(config: {ip: string; file: string }): Promise<{ file: string }>
    /**
     * @param {string} fileName ./arp-table.json
     */
    static loadArpTable(fileName: string): Promise<IHost[]>
    /**
     * @param {string} fileName ./devices-cache.json
     */
    static loadCachedDevices(fileName: string): Promise<IDevice[]>
  }

  export interface IDeviceUpdate {
    msg: string;
    version?: string;
  }

  export interface IHost {
    ip: string;
    mac: string;
  }

  export interface IDevice {
    _id: string;
    name: string;
    type: string;
    deviceid: string;
    apikey: string;
    extra: IExtra2;
    __v: number;
    onlineTime: string;
    ip: string;
    location: string;
    offlineTime: string;
    deviceStatus: string;
    tags: ITags;
    settings: ISettings;
    devGroups: any[];
    groups: any[];
    params: IParams;
    online: boolean;
    createdAt: string;
    group: string;
    sharedTo: any[];
    devicekey: string;
    deviceUrl: string;
    brandName: string;
    showBrand: boolean;
    brandLogoUrl: string;
    productModel: string;
    devConfig: IDevConfig;
    uiid: number;
  }

  export interface IDevConfig {
  }

  export interface IParams {
    pulseWidth: number;
    pulse: string;
    init: number;
    sledOnline: string;
    version: number;
    timers: any[];
    controlType: string;
    partnerApikey: string;
    bindInfos: IBindInfos;
    rssi: number;
    staMac: string;
    startup: string;
    fwVersion: string;
    switch: string;
  }

  export interface IBindInfos {
    gaction: string[];
  }

  export interface ISettings {
    alarmNotify: number;
    opsHistory: number;
    opsNotify: number;
  }

  export interface ITags {
    m_4434_sany: string;
  }

  export interface IExtra2 {
    _id: string;
    extra: IExtra;
  }

  export interface IExtra {
    description: string;
    brandId: string;
    apmac: string;
    mac: string;
    ui: string;
    modelInfo: string;
    model: string;
    manufacturer: string;
    uiid: number;
    staMac: string;
    chipid: string;
  }

  export interface IDeviceState {
    switch?: string;
    outlet?: number;
  }

  export interface ISwitchCount {
    switchesAmount?: number;
  }

  export interface ITemperatureHumidity {
    temperature?: number;
    humidity?: number;
  }

  export interface IPowerUsage {
    monthly?: number;
    daily?: IDaily[];
  }

  export interface IFirmwareVersion {
    fwVersion?: string;
  }

  export interface ILoginInfo {
    at: string;
    rt: string;
    user: IUser;
    region: string;
  }

  export interface IUser {
    _id: string;
    email: string;
    appId: string;
    lang: string;
    online: boolean;
    onlineTime: string;
    ip: string;
    location: string;
    offlineTime: string;
    userStatus: string;
    appInfos: IAppInfo[];
    isAccepEmailAd: boolean;
    bindInfos: ILoginBindInfos;
    createdAt: string;
    apikey: string;
  }

  export interface ILoginBindInfos {
    gaction: string[];
  }

  export interface IAppInfo {
    appVersion: string;
    os: string;
  }

  export interface IDaily {
    day: number;
    usage: number;
  }
}
