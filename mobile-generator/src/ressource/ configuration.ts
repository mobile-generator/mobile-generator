import { TemplateType, PlatformType } from './enum';
import { SdkVersion } from './sdk_version';
import { ADVISED_MIN_ANDROID, ADVISED_TARGET_ANDROID } from './constants';

export class Configuration {
    app_name: string;
    app_id: number;
    mobile_platform: string;
    sdk_min_version: SdkVersion;
    sdk_target_version: SdkVersion;
    template: TemplateType;
    internet_permission: boolean;

    constructor() {
        this.app_name = '';
        this.app_id = 0;
        this.mobile_platform = PlatformType.Android;
        this.sdk_min_version = ADVISED_MIN_ANDROID;
        this.sdk_target_version = ADVISED_TARGET_ANDROID;
        this.template = TemplateType.Drawer;
        this.internet_permission = false;
    }

    toSring() {
        return JSON.stringify(this, null, 4);
    }
}