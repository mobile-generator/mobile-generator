import * as ANDROID_CONF from '../../ressource/config/android.json'
import * as FLUTTER_CONF from '../../ressource/config/flutter.json'
import * as IOS_CONF from '../../ressource/config/ios.json'

import { JSONConstantPlatformConfiguration } from './constant-platform-configuration'
import { PlatformType, TemplateType } from './enum'
import { JSONPlatformConfiguration } from './platform-configuration'
import { SdkVersion } from './sdk-version'

/**
 * Interface used to default value for user configuration from JSON file
 */
export interface JSONUserPlatformConfiguration extends JSONPlatformConfiguration {
    platform: string
    template: string
}

/**
 * Interface for user configuration
 */
export interface IUserPlatformConfiguration {
    platform: PlatformType
    template: TemplateType
}

/**
 * Class which represent user configuration
 */
export class UserPlatformConfiguration implements IUserPlatformConfiguration {
    /**
     * fromPlatformType
     * @param platform chosen platform
     * @summary Load configuration with default value for given platform
     */
    static fromPlatformType(platform: PlatformType) {
        switch (platform) {
            case PlatformType.Android:
                return this.fromJSON(ANDROID_CONF)
            case PlatformType.iOS:
                return this.fromJSON(IOS_CONF)
            case PlatformType.Flutter:
                return this.fromJSON(FLUTTER_CONF)
        }
    }

    /**
     * fromJSON
     * @param config JSON configuration
     * @summary Parse JSON and return configuration
     */
    static fromJSON(config: JSONConstantPlatformConfiguration) {
        return new this(
            (PlatformType as any)[config.platform],
            (TemplateType as any)[config.template[0]],
            SdkVersion.fromString(config.sdk_min_version),
            SdkVersion.fromString(config.sdk_target_version)
        )
    }

    platform: PlatformType
    template: TemplateType
    sdk_min_version: SdkVersion
    sdk_target_version: SdkVersion

    constructor(
        platform: PlatformType,
        template: TemplateType,
        sdk_min_version: SdkVersion,
        sdk_target_version: SdkVersion
    ) {
        this.platform = platform
        this.template = template
        this.sdk_min_version = sdk_min_version
        this.sdk_target_version = sdk_target_version
    }
}
