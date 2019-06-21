import { PlatformType } from './enum'
import { ISdkVersion } from './sdk-version'

export interface JSONPlatformConfiguration {
    platform: string
    sdk_min_version: string
    sdk_target_version: string
}

export interface IPlatformConfiguration {
    platform: PlatformType
    sdk_min_version: ISdkVersion
    sdk_target_version: ISdkVersion
}