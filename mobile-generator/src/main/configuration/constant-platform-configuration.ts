import * as ANDROID_CONF from '../../ressource/config/android.json'
import * as FLUTTER_CONF from '../../ressource/config/flutter.json'
import * as IOS_CONF from '../../ressource/config/ios.json'

import { PlatformType, TemplateType } from './enum'
import { IMobilePlatformConfiguration, JSONMobilePlatformConfiguration } from './mobile-platform-configuration'
import { ISdkVersion, SdkVersion } from './sdk-version'

export interface JSONConstantPlatformConfiguration extends JSONMobilePlatformConfiguration {
    sdk_version: string[]
}

export interface IConstantPlatformConfiguration extends IMobilePlatformConfiguration {
    sdk_version: ISdkVersion[]
}

export class ConstantPlatformConfiguration implements IConstantPlatformConfiguration {
    static fromPlatformType(platform: PlatformType) {
        switch (platform) {
            case PlatformType.Android:
                return this.fromJSON(ANDROID_CONF)
            case PlatformType.IOS:
                return this.fromJSON(IOS_CONF)
            case PlatformType.Flutter:
                return this.fromJSON(FLUTTER_CONF)
        }
    }

    static fromJSON(config: JSONConstantPlatformConfiguration) {
        return new this(
            (PlatformType as any)[config.platform],
            config.sdk_version.map(str => SdkVersion.fromString(str)),
            config.template.map(template => (TemplateType as any)[template]),
            SdkVersion.fromString(config.sdk_min_version),
            SdkVersion.fromString(config.sdk_target_version)
        )
    }

    platform: PlatformType
    sdk_version: SdkVersion[]
    template: TemplateType[]
    sdk_min_version: SdkVersion
    sdk_target_version: SdkVersion

    constructor(
        platform: PlatformType,
        sdk_version: SdkVersion[],
        template: TemplateType[],
        sdk_min_version: SdkVersion,
        sdk_target_version: SdkVersion
    ) {
        this.platform = platform
        this.sdk_version = sdk_version
        this.template = template
        this.sdk_min_version = sdk_min_version
        this.sdk_target_version = sdk_target_version
    }
}
