import { Configuration } from '../configuration/configuration'

export class MustacheData {
    static fromConfiguration(config: Configuration) {
        return new this(
            config.app_name,
            config.app_id,
            config.platform_configuration.template,
            config.platform_configuration.sdk_min_version.toString(),
            config.platform_configuration.sdk_target_version.toString(),
            config.internet_permission ? 'true' : 'false'
            )
    }

    app_name: string
    app_id: string
    template: string
    min_version: string
    target_version: string
    internet_permission: string

    constructor(
        app_name: string,
        app_id: string,
        template: string,
        min_version: string,
        target_version: string,
        internet_permission: string
    ) {
        this.app_name = app_name
        this.app_id = app_id
        this.template = template
        this.min_version = min_version
        this.target_version = target_version
        this.internet_permission = internet_permission
    }
}
