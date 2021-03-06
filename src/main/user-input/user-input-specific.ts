import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'

import { androidConfigForm, androidConfigFromFlags } from './user-input-android'
import { flutterConfigForm, flutterConfigFromFlags } from './user-input-flutter'
import { iosConfigForm, iosConfigFromFlags } from './user-input-ios'

/**
 * specificPlatformConfigForm
 * @param config user configuration
 * @returns configuration form specific to the chosen platform
 * @summary
 * It will select the specific platform config form
 * according to the configuration
 */
export function specificPlatformConfigForm(config: Configuration): Promise<boolean> {
    switch (config.platform_configuration.platform) {
        case PlatformType.Android: return androidConfigForm(config)
        case PlatformType.Flutter: return flutterConfigForm()
        case PlatformType.iOS: return iosConfigForm(config)
    }
}

/**
 * specificPlatformConfigFromFlags
 * @param str platform
 * @summary
 * Set configuration settings for chosen platform
 */
export function specificPlatformConfigFromFlags(str: string, flags: any, configuration: Configuration): void {
    switch (str) {
        case PlatformType.Android.toLowerCase(): return androidConfigFromFlags(flags, configuration)
        case PlatformType.Flutter.toLowerCase(): return flutterConfigFromFlags(flags, configuration)
        case PlatformType.iOS.toLowerCase(): return iosConfigFromFlags(flags, configuration)
    }
}
