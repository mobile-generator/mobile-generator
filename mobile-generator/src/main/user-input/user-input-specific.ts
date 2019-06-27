import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'

import { androidConfigForm } from './user-input-android'
import { flutterConfigForm } from './user-input-flutter'
import { iosConfigForm } from './user-input-ios'

/**
 * specificPlatformConfigForm
 * @param config user configuration
 * @returns configuration form specific to the chosen platform
 * @summary
 * It will select the specific platform config form
 * according to the configuration
 */
export function specificPlatformConfigForm(config: Configuration) {
    switch (config.platform_configuration.platform) {
        case PlatformType.Android: return androidConfigForm(config)
        case PlatformType.Flutter: return flutterConfigForm()
        case PlatformType.IOS: return iosConfigForm(config)
    }
}
