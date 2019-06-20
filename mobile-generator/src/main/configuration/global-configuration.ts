import { PlatformType } from './enum';
import { ConstantPlatformConfiguration, IConstantPlatformConfiguration } from './constant-platform-configuration';

export class GlobalConfiguration {
    platform = Object.keys(PlatformType).map(key => ConstantPlatformConfiguration.fromPlatformType((<any>PlatformType)[key]));
    getPlatformConfiguration(platform: PlatformType) {
        // this.platform[0] will never be called since all PlatformType exist in this.platform
        return this.platform.find(config => config.platform == platform) || this.platform[0];
    }
}