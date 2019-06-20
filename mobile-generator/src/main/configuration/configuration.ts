import { PlatformType } from './enum';
import { MobilePlatformConfiguration } from './mobile-platform-configuration';
import * as ANDROID_CONF from '../../ressource/config/android.json';

export class Configuration {
    app_name: string;
    app_id: string;
    mobile_platform_configuration: MobilePlatformConfiguration;
    internet_permission: boolean;

    constructor() {
        this.app_name = '';
        this.app_id = '';
        this.mobile_platform_configuration = MobilePlatformConfiguration.fromJSON(ANDROID_CONF);
        this.internet_permission = false;
    }

    toString() {
        return JSON.stringify(this, null, 4);
    }
}