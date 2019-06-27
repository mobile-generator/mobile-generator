import * as inquirer from 'inquirer'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { UserPlatformConfiguration } from '../configuration/user-platform-configuration'
import { stringToPackageNameFormat, validatePackageName } from '../utils/string-utils'

export async function commonConfigForm(configuration: Configuration) {
    let platform: any = await inquirer.prompt([
        // Prompt for platform target
        {
            type: 'list',
            name: 'value',
            message: 'Select a target platform',
            choices: Object.keys(PlatformType).map(key => ({ name: key, value: (PlatformType as any)[key] })),
        },
    ])

    configuration.platform_configuration = UserPlatformConfiguration.fromPlatformType(platform.value)

    let app_name: any = await inquirer.prompt([
        // Prompt for app name
        {
            type: 'input',
            name: 'value',
            message: "What's your app name",
            validate(name) {
                return name !== ''
            },
            default() {
                return 'my-app'
            }
        },
        // Prompt for app id
    ])

    configuration.app_name = app_name.value

    let commonResponses: any = await inquirer.prompt([

        {
            type: 'input',
            name: 'app_id',
            message: getQuestionGroupNameOrAppId(configuration),
            validate: validatePackageName,
            transformer(input) {
                if (input !== '') {
                    return input + `.${stringToPackageNameFormat(configuration.app_name)}`
                }
                return ''
            },
            default() {
                return `com.mycompany.${stringToPackageNameFormat(configuration.app_name)}`
            }
        },
        // Prompt for internet permission
        {
            type: 'confirm',
            name: 'internet_permission',
            message: 'Will your application need internet access ?',
        }
    ])

    configuration.app_id = commonResponses.app_id
    configuration.internet_permission = commonResponses.internet_permission

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

function getQuestionGroupNameOrAppId(configuration: Configuration) {
    switch (configuration.platform_configuration.platform) {
        case(PlatformType.Android): return 'What is your group name'
        case(PlatformType.Flutter): return 'What\'s your group name/app id'
        case(PlatformType.IOS): return 'What\'s your app id'
    }
}
