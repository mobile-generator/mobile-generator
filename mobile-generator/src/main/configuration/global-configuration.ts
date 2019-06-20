import { ConstantPlatformConfiguration } from './constant-platform-configuration'
import { PlatformType } from './enum'

export class GlobalConfiguration {
    platform = Object.keys(PlatformType).map(key => ConstantPlatformConfiguration.fromPlatformType((PlatformType as any)[key]))
    getPlatformConfiguration(platform: PlatformType) {
        // this.platform[0] will never be called since all PlatformType exist in this.platform
        return this.platform.find(config => config.platform === platform) || this.platform[0]
    }
}
