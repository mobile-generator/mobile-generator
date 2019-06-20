import { PlatformType } from './enum';
import { ConstantPlatformConfiguration, ConstantPlatformConfigurationI } from './constant_platform_configuration';

export class GlobalConfiguration {
    platform = Object.keys(PlatformType).map(key => ConstantPlatformConfiguration.fromPlatformType((<any>PlatformType)[key]));
    getPlatformConfiguration(platform: PlatformType) {
        // this.platform[0] will never be called since all PlatformType exist in this.platform
        return this.platform.find(config => config.platform == platform) || this.platform[0];
    }
}