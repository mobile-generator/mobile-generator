import * as ANDROID_CONF from '../ressource/config/android.json'

import { UserPlatformConfiguration } from './user-platform-configuration'

/* Configuration
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

    // Constructor
    constructor() {
        this.app_name = ''
        this.app_id = ''
        this.platform_configuration = UserPlatformConfiguration.fromJSON(ANDROID_CONF)
        this.internet_permission = false
    }

    /**
     * @method getTemplateDirName
     * @returns `string`: directory name of the corresponding template
     */
    getTemplateDirName() {
        return (this.platform_configuration.platform + '-' + this.platform_configuration.template + '-template').toLowerCase()
    }

    /**
     * @method toString
     * @returns `string`: display class instance values
     */
    toString() {
        return 'Configuration ' + JSON.stringify(this, null, 4)
    }
}
