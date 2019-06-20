import { TemplateType, PlatformType } from './enum';
import { ISdkVersion, SdkVersion } from './sdk-version';

import * as ANDROID_CONF from '../../ressource/config/android.json';
import * as IOS_CONF from '../../ressource/config/ios.json';
import * as FLUTTER_CONF from '../../ressource/config/flutter.json';


export interface JSONMobilePlatformConfiguration {
    platform: string;
    template: string[];
    sdk_min_version: string;
    sdk_target_version: string;
}

export interface IMobilePlatformConfiguration {
    platform: PlatformType;
    template: TemplateType[];
    sdk_min_version: ISdkVersion;
    sdk_target_version: ISdkVersion;
}

export class MobilePlatformConfiguration implements IMobilePlatformConfiguration {
    platform: PlatformType;
    template: TemplateType[];
    sdk_min_version: SdkVersion;
    sdk_target_version: SdkVersion;

    static fromPlatformType(platform: PlatformType) {
        switch (platform){
            case PlatformType.Android:
                return this.fromJSON(ANDROID_CONF);
            case PlatformType.IOS:
                return this.fromJSON(IOS_CONF);
            case PlatformType.Flutter:
                return this.fromJSON(FLUTTER_CONF);
        }
    }

    static fromJSON(config: JSONMobilePlatformConfiguration) {
        return new this(
            (<any>PlatformType)[config.platform],
            config.template.map(template => (<any>TemplateType)[template]),
            SdkVersion.fromString(config.sdk_min_version),
            SdkVersion.fromString(config.sdk_target_version)
            )
    }

    constructor(
        platform: PlatformType,
        template: TemplateType[],
        sdk_min_version: SdkVersion,
        sdk_target_version: SdkVersion
    ) {
        this.platform = platform;
        this.template = template;
        this.sdk_min_version = sdk_min_version;
        this.sdk_target_version = sdk_target_version;
    }
}