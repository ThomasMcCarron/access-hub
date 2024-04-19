import { IPlatform } from '../model/platform.model';

export const WEB: IPlatform = {
  id: 1,
  name: 'Web'
};
export const IOS: IPlatform = {
  id: 2,
  name: 'iOS'
};
export const ANDROID: IPlatform = {
  id: 3,
  name: 'Android'
};
export const WINDOWS: IPlatform = {
  id: 4,
  name: 'Windows'
};
export const MACOS: IPlatform = {
  id: 5,
  name: 'MacOS'
};
export const LINUX: IPlatform = {
  id: 6,
  name: 'Linux'
};
export const CHROMEOS: IPlatform = {
  id: 7,
  name: 'ChromeOS'
};
export const WEAROS: IPlatform = {
  id: 8,
  name: 'WearOS'
};
export const WATCHOS: IPlatform = {
  id: 9,
  name: 'WatchOS'
};
export const HARDWARE: IPlatform = {
  id: 10,
  name: 'Hardware'
};

export const PLATFORMS = [
  WEB, IOS, ANDROID, WINDOWS, MACOS, LINUX, CHROMEOS, WEAROS, WATCHOS, HARDWARE
];
