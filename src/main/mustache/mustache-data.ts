import { readFileSync } from 'fs-extra'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'

/**
 * Translate user configuration data to data
 * that Mustache can use.
 */
export class MustacheData {
    static fromConfiguration(config: Configuration) {
        const configuration = new this(
            config.app_name,
            config.app_id,
            config.platform_configuration.template,
            config.platform_configuration.sdk_min_version.toString(),
            config.platform_configuration.sdk_target_version.toString(),
            config.internet_permission ? 'true' : 'false'
        )

        switch (config.platform_configuration.platform) {
            case PlatformType.Android:
                configuration.android_strings_content = readFileSync(__dirname + '/../../ressource/component/android-strings-content.txt').toString()
                configuration.android_default_imports = readFileSync(__dirname + '/../../ressource/component/android-default-imports.txt').toString()
                configuration.android_default_colors = readFileSync(__dirname + '/../../ressource/component/android-default-colors.txt').toString()
        }

        return configuration
    }

    app_name: string
    app_id: string
    template: string
    min_version: string
    target_version: string
    internet_permission: string

    android_strings_content: string | undefined
    android_default_imports: string | undefined
    android_default_colors: string | undefined

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
