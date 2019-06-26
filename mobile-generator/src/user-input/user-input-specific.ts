import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'

import { androidConfigForm } from './user-input-android'
import { flutterConfigForm } from './user-input-flutter'
import { iosConfigForm } from './user-input-ios'

export function specificPlatformConfigForm(config: Configuration) {
    switch (config.platform_configuration.platform) {
        case PlatformType.Android: return androidConfigForm(config)
        case PlatformType.Flutter: return flutterConfigForm()
        case PlatformType.IOS: return iosConfigForm(config)
    }
}
