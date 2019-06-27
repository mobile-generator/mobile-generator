import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { ConstantPlatformConfiguration } from '../configuration/constant-platform-configuration'
import { PlatformType } from '../configuration/enum'

/**
 * iosConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for iOS specific configuration using InquirerJS
 */
export async function iosConfigForm(configuration: Configuration) {
    // Retrieve iOS configuration
    const ios_config = ConstantPlatformConfiguration.fromPlatformType(PlatformType.IOS)

    // Retrieve advised min sdk version index from the SDK version list
    const advised_min_version_index = ios_config
        .sdk_version
        .map(version => {
            return version.compare(ios_config.sdk_min_version)
        })
        .indexOf(0)

    // Retrieve SDK min version list mapped to be use with InquirerJS prompt
    const min_version_list = ios_config
        .sdk_version
        .map(version => ({ name: version.toString(), value: version }))

    // Add `(advised)` word to the advised min SDK
    min_version_list[advised_min_version_index].name += ' (advised)'

    // Prompt for app name SDK min version
    let sdk_min_version: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: `What's your min ${configuration.platform_configuration.platform} SDK version ?`,
            default: advised_min_version_index,
            choices: min_version_list,
        }
    ])

    // set prompted min SDK value
    configuration.platform_configuration.sdk_min_version = sdk_min_version.value

    // Prompt for application template
    let template: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: 'What kind of application template would you use ?',
            choices: ios_config
                .template
                .map(template => ({ name: template.toString(), value: template })),
        }
    ])

    // set prompted template value
    configuration.platform_configuration.template = template.value

    return true

}
