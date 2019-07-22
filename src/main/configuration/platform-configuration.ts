import { PlatformType } from './enum'
import { ISdkVersion } from './sdk-version'

/**
 * Interface used to load constant configuration for platform from JSON file
 */
export interface JSONPlatformConfiguration {
    platform: string
    sdk_min_version: string
    sdk_target_version: string
}

/**
 * Interface for user and constant configuration
 */
export interface IPlatformConfiguration {
    platform: PlatformType
    sdk_min_version: ISdkVersion
    sdk_target_version: ISdkVersion
}
