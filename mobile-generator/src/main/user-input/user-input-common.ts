const chalkPipe = require('chalk-pipe')
import * as inquirer from 'inquirer'
import * as stripAnsi from 'strip-ansi'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { UserPlatformConfiguration } from '../configuration/user-platform-configuration'
import { stringToPackageNameFormat, validatePackageName } from '../utils/string-utils'

/**
 * commonConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for iOS specific configuration using InquirerJS
 */
export async function commonConfigForm(configuration: Configuration) {
    // Prompt for platform target
    let platform: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: 'Select a target platform',
            choices: Object.keys(PlatformType).map(key => ({ name: key, value: (PlatformType as any)[key] })),
        },
    ])

    // set prompted platform value
    configuration.platform_configuration = UserPlatformConfiguration.fromPlatformType(platform.value)

    // Prompt for app name
    let app_name: any = await inquirer.prompt([
        {
            type: 'input',
            name: 'value',
            message: "What's your app name",
            validate(name) {
                name = stripAnsi.default(name)
                return name !== ''
            },
            default() {
                return chalkPipe('orange')('my-app')
            },
            transformer(str) {
                return chalkPipe('orange')(str)
            },
            filter(str) {
                return stripAnsi.default(str)
            }
        },
    ])

    // set prompted application name value
    configuration.app_name = app_name.value

    let commonResponses: any = await inquirer.prompt([
        // Prompt for app id
        {
            type: 'input',
            name: 'app_id',
            message: getQuestionGroupNameOrAppId(configuration),
            validate: validatePackageName,
            transformer(input) {
                if (input !== '') {
                    let tmp = input.split('.')
                    if (tmp.length < 2) {
                        return `${chalkPipe('yellow')(input)}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
                    } else {
                        return`${chalkPipe('yellow')(tmp.slice(0, -1).join('.'))}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
                    }
                }
                return ''
            },
            default() {
                return `${chalkPipe('yellow')('com.mycompany')}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
            },
            filter(str) {
                str = stripAnsi.default(str)

                if (!str.endsWith(stringToPackageNameFormat(configuration.app_name))) {
                    str = str + '.' + stringToPackageNameFormat(configuration.app_name)
                }
                return str
            }
        },
        // Prompt for internet permission
        {
            type: 'confirm',
            name: 'internet_permission',
            message: 'Will your application need internet access ?',
        }
    ])

    // set prompted application ID value
    configuration.app_id = commonResponses.app_id
    // set prompted internet permission value
    configuration.internet_permission = commonResponses.internet_permission

    return true
}

/**
 * overwriteDestDirForm
 * @param configuration user configuration
 * @returns It will returns a promise
 * which resolve as true or false depending on the answer if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask if user wants to overwrite destination directory using InquirerJS
 */
export async function overwriteDestDirForm(configuration: Configuration) {
    // Prompt for overwrite
    let overwrite: any = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'value',
            default: false,
            message: `Folder ${configuration.app_name} already exist, do you want to overwrite it`,
        }
    ])

    // Returns user answer as a boolean (Yes/No)
    return overwrite.value
}

/**
 * getQuestionGroupNameOrAppId
 * @param configuration user configuration
 * @returns Platform's corresponding question
 * @summary This will return corresponding question for `app_id` configuration property
 */
function getQuestionGroupNameOrAppId(configuration: Configuration) {
    switch (configuration.platform_configuration.platform) {
        case(PlatformType.Android): return 'What is your group name'
        case(PlatformType.Flutter): return 'What\'s your group name/app id'
        case(PlatformType.IOS): return 'What\'s your app id'
    }
}
