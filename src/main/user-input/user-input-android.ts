import { flags } from '@oclif/command'
import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { ConstantPlatformConfiguration } from '../configuration/constant-platform-configuration'
import { PlatformType } from '../configuration/enum'
import { SdkVersion } from '../configuration/sdk-version'

// Retrieve Android configuration
const android_config = ConstantPlatformConfiguration.fromPlatformType(PlatformType.Android)

/**
 * ANDROID_FLAGS
 * Flags for android configuration
 */
export const ANDROID_FLAGS = {
    android_min_sdk: flags.string({description: 'Android Min SDK', options: android_config.sdk_version.map(version => version.toString()) }),
    android_target_sdk: flags.string({description: 'Android Target SDK', options: android_config.sdk_version.map(version => version.toString()) }),
    android_template: flags.string({description: 'Android Template SDK', options: android_config.template }),
}

/**
 * androidConfigFromFlags
 * @param flags flags passed to CLI
 * @param configuration user configuration
 * @summary It will set specific configuration for Android using flags values
 */
export function androidConfigFromFlags(flags: any, configuration: Configuration): void {
    configuration.platform_configuration.platform = PlatformType.Android
    configuration.platform_configuration.sdk_min_version = SdkVersion.fromString(flags.android_min_sdk)
    configuration.platform_configuration.sdk_target_version = SdkVersion.fromString(flags.android_target_sdk)
    configuration.platform_configuration.template = flags.android_template
}

/**
 * androidConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for Android specific configuration using InquirerJS
 */
export async function androidConfigForm(configuration: Configuration): Promise<boolean> {
    // Retrieve advised sdk version index from the SDK version list
    const advised_target_version_index = android_config
        .sdk_version
        .map(version => {
            return version.compare(android_config.sdk_target_version)
        })
        .indexOf(0)

    // Retrieve SDK version list mapped to be use with InquirerJS prompt
    const target_version_list = android_config
        .sdk_version
        .map(version => ({ name: version.toString(), value: version }))

    // Add `(advised)` word to the advised target SDK
    target_version_list[advised_target_version_index].name += ' (advised)'

    // Prompt for app name SDK target version
    let sdk_target_version: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: `What's your target ${configuration.platform_configuration.platform} SDK version ?`,
            default: advised_target_version_index,
            choices: target_version_list,
        }
    ])

    // set prompted target SDK value
    configuration.platform_configuration.sdk_target_version = sdk_target_version.value

    // Retrieve advised min sdk version index from the SDK version list
    const advised_min_version_index = android_config
        .sdk_version
        .map(version => {
            return version.compare(android_config.sdk_min_version)
        })
        .indexOf(0)

    // Retrieve SDK min version list mapped to be use with InquirerJS prompt
    const min_version_list = android_config
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
            choices: android_config
                .template
                .map(template => ({ name: template.toString(), value: template })),
        }
    ])

    // set prompted template value
    configuration.platform_configuration.template = template.value

    return true

}
