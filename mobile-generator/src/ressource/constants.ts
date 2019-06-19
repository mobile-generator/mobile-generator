import { SdkVersion } from './sdk_version'
import { PlatformType } from './enum';

export const SDK_VERSION = {
    Android: [
        new SdkVersion(21),
        new SdkVersion(22),
        new SdkVersion(23),
        new SdkVersion(24),
        new SdkVersion(25),
        new SdkVersion(26),
        new SdkVersion(27),
        new SdkVersion(28),
        new SdkVersion(29),
    ],
    iOS: [
        new SdkVersion(8,4),
        new SdkVersion(9,3),
        new SdkVersion(10,3),
        new SdkVersion(12,3),
    ],
    Flutter: []
}

export const ADVISED_MIN_ANDROID = new SdkVersion(21);
export const ADVISED_TARGET_ANDROID = new SdkVersion(29);

export const ADVISED_MIN_IOS = SDK_VERSION[PlatformType.IOS][-3];
export const ADVISED_TARGET_IOS = SDK_VERSION[PlatformType.IOS][-1];