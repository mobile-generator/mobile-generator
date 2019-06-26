import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { GlobalConfiguration } from '../configuration/global-configuration'

export async function specificConfigForm(configuration: Configuration) {
    let global_configuration = new GlobalConfiguration()

    if (configuration.platform_configuration.platform === PlatformType.Flutter) {
        // Flutter CLI will fill corresponding value

    } else {
        let sdk_target_version: any = await inquirer.prompt([
            {
                type: 'list',
                name: 'value',
                message: `What's your target ${configuration.platform_configuration.platform} SDK version ?`,
                choices: global_configuration
                    .getPlatformConfiguration(configuration.platform_configuration.platform)
                    .sdk_version
                    .map(version => ({ name: version.toString(), value: version })),
            }
        ])

        configuration.platform_configuration.sdk_target_version = sdk_target_version.value

        let sdk_min_version: any = await inquirer.prompt([
            {
                type: 'list',
                name: 'value',
                message: `What's your min ${configuration.platform_configuration.platform} SDK version ?`,
                choices: global_configuration
                    .getPlatformConfiguration(configuration.platform_configuration.platform)
                    .sdk_version
                    .filter(version => version.compare(configuration.platform_configuration.sdk_target_version) <= 0)
                    .map(version => ({ name: version.toString(), value: version })),
            }
        ])

        configuration.platform_configuration.sdk_min_version = sdk_min_version.value

        let template: any = await inquirer.prompt([
            {
                type: 'list',
                name: 'value',
                message: 'What kind of application template would you use ?',
                choices: global_configuration
                    .getPlatformConfiguration(configuration.platform_configuration.platform)
                    .template
                    .map(template => ({ name: template.toString(), value: template })),
            }
        ])

        configuration.platform_configuration.template = template.value

        let internet_permission: any = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'value',
                message: 'Will your application needs internet access ?',
            }
        ])

        configuration.internet_permission = internet_permission.value

        return 0
    }
}
