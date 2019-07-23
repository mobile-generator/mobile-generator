import * as ANDROID_CONF from '../../ressource/config/android.json'

import { UserPlatformConfiguration } from './user-platform-configuration'

/**
 * This class represent the configuration the user will set.
 * It will be set throughout the questions
 */
export class Configuration {
    // Application name, example: my-app
    app_name: string
    // Application id, example: com.mycompany.myapp
    app_id: string
    // Configuration for chosen platform
    platform_configuration: UserPlatformConfiguration
    // Wether or not give application access to internet
    internet_permission: boolean

    constructor() {
        this.app_name = 'my-App'
        this.app_id = 'com.mycompany.my_app'
        this.platform_configuration = UserPlatformConfiguration.fromJSON(ANDROID_CONF)
        this.internet_permission = false
    }

    /**
     * getTemplateDirName
     * @returns `string`: directory name of the corresponding template
     * @summary return template directory corresponding to configuration
     */
    getTemplateDirName() {
        return (this.platform_configuration.platform + '-' + this.platform_configuration.template + '-template').toLowerCase()
    }

    /**
     * getGroupName
     * @returns `string`: group name
     * @summary return group name (app_id without application name at the end)
     */
    getGroupName() {
        return (this.app_id.split('.').slice(0, -1).join('.'))
    }

    /**
     * toString
     * @returns `string`: display class instance values
     * @summary Returns class information
     */
    toString() {
        return 'Configuration ' + JSON.stringify(this, null, 4)
    }
}
