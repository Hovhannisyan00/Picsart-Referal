import { DeviceTypes, getDeviceType } from '@picsart/ds-foundation/styleHelpers';

export const bugsnagApiKey = import.meta.env.VITE_BUGSNAG_API_KEY;
export const isDesktop = getDeviceType().deviceType === DeviceTypes.Desktop;
