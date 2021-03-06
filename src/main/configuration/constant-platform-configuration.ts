import * as ANDROID_CONF from '../../ressource/config/android.json'
import * as FLUTTER_CONF from '../../ressource/config/flutter.json'
import * as IOS_CONF from '../../ressource/config/ios.json'

import { PlatformType, TemplateType } from './enum'
import { IPlatformConfiguration, JSONPlatformConfiguration } from './platform-configuration'
import { ISdkVersion, SdkVersion } from './sdk-version'

/**
 * Interface used to load constant configuration for platform from JSON file
 */
export interface JSONConstantPlatformConfiguration extends JSONPlatformConfiguration {
    sdk_version: string[]
    template: string[]
}

/**
 * Interface for constant configuration for a specific platform
 */
export interface IConstantPlatformConfiguration extends IPlatformConfiguration {
    sdk_version: ISdkVersion[]
    template: TemplateType[]
}

/**
 * Class which represent constant configuration for a specific platform
 */
export class ConstantPlatformConfiguration implements IConstantPlatformConfiguration {
    /**
     * fromPlatformType
     * @param platform chosen platform
     * @summary Load configuration for given platform
     */
    static fromPlatformType(platform: PlatformType): ConstantPlatformConfiguration {
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
    static fromJSON(config: JSONConstantPlatformConfiguration): ConstantPlatformConfiguration {
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
