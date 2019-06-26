import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { UserPlatformConfiguration } from '../configuration/user-platform-configuration'

export async function commonConfigForm(configuration: Configuration) {
    let commonResponses: any = await inquirer.prompt([
        // Prompt for platform target
        {
            type: 'list',
            name: 'platform',
            message: 'Select targeted platform',
            choices: Object.keys(PlatformType).map(key => ({ name: key, value: (PlatformType as any)[key] })),
        },
        // Prompt for app name
        {
            type: 'input',
            name: 'app_name',
            message: "What's your app name",
            validate(name) {
                return name !== ''
            },
            default() {
                return 'my-app'
            }
        },
        // Prompt for app id
        {
            type: 'input',
            name: 'app_id',
            message: "What's your app id",
            validate(name) {
                return name !== ''
            },
            default() {
                return 'com.mycompany.myapp'
            }
        }
    ])

    configuration.app_name = commonResponses.app_name
    configuration.app_id = commonResponses.app_id
    configuration.platform_configuration = UserPlatformConfiguration.fromPlatformType(commonResponses.platform)

    return 0
}

export async function overwriteDestDirForm(configuration: Configuration) {
    let overwrite: any = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'value',
            default: false,
            message: `Folder ${configuration.app_name} already exist, do you want to overwrite it`,
        }
    ])
    return overwrite.value
}
