import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { ConstantPlatformConfiguration } from '../configuration/constant-platform-configuration';
import { PlatformType } from '../configuration/enum'

export async function iosConfigForm(configuration: Configuration) {
    const ios_config = ConstantPlatformConfiguration.fromPlatformType(PlatformType.IOS)

    const advised_min_version_index = ios_config
        .sdk_version
        .map(version => {
            return version.compare(ios_config.sdk_min_version)
        })
        .indexOf(0)

    const min_version_list = ios_config
        .sdk_version
        .map(version => ({ name: version.toString(), value: version }))

    min_version_list[advised_min_version_index].name += ' (advised)'

    let sdk_min_version: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: `What's your min ${configuration.platform_configuration.platform} SDK version ?`,
            default: advised_min_version_index,
            choices: min_version_list,
        }
    ])

    configuration.platform_configuration.sdk_min_version = sdk_min_version.value

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

    configuration.platform_configuration.template = template.value

    return 0

}
