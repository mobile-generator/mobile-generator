import { SdkVersion } from './sdk_version'
import { PlatformType, TemplateType } from './enum';

export const GLOBAL = {
    Android: {
        sdk_version: [
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
        template: [
            TemplateType.Drawer,
            TemplateType.SingleView,
            TemplateType.Tabbar
        ],
        advised_min_sdk: new SdkVersion(21),
        advised_target_sdk: new SdkVersion(29),

    },
    iOS: {
        sdk_version: [
            new SdkVersion(8, 4),
            new SdkVersion(9, 3),
            new SdkVersion(10, 3),
            new SdkVersion(12, 3),
        ],
        template: [
            TemplateType.SingleView,
            TemplateType.Tabbar
        ],
        advised_min_sdk: ['sdk_version'][-3],
        advised_target_sdk: ['sdk_version'][-1],
    },
    Flutter: {}
}
