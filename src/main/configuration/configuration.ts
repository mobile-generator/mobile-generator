import * as ANDROID_CONF from '../../ressource/config/android.json'
import { DEFAULT_APP_ID, DEFAULT_APP_NAME } from '../utils/constants.js'

import { UserPlatformConfiguration } from './user-platform-configuration'

/**
 * This class represent the configuration the user will set.
 * It will be set throughout the questions
 */
export class Configuration {
    app_name: string
    app_id: string
    platform_configuration: UserPlatformConfiguration
    internet_permission: boolean

    constructor() {
        this.app_name = DEFAULT_APP_NAME
        this.app_id = DEFAULT_APP_ID
        this.platform_configuration = UserPlatformConfiguration.fromJSON(ANDROID_CONF)
        this.internet_permission = false
    }

    /**
     * getTemplateDirName
     * @returns `string`: directory name of the corresponding template
     * @summary return template directory corresponding to configuration
     */
    getTemplateDirName(): string {
        return (this.platform_configuration.platform + '-' + this.platform_configuration.template + '-template').toLowerCase()
    }

    /**
     * getGroupName
     * @returns `string`: group name
     * @summary return group name (app_id without application name at the end)
     */
    getGroupName(): string {
        return (this.app_id.split('.').slice(0, -1).join('.'))
    }

    /**
     * toString
     * @returns `string`: display class instance values
     * @summary Returns class information
     */
    toString(): string {
        return 'Configuration ' + JSON.stringify(this, null, 4)
    }
}
