const chalkPipe = require('chalk-pipe')
import { flags } from '@oclif/command'
import * as inquirer from 'inquirer'
import * as stripAnsi from 'strip-ansi'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { UserPlatformConfiguration } from '../configuration/user-platform-configuration'
import { DEFAULT_GROUP_NAME, DEFAULT_PACKAGE_NAME } from '../utils/constants'
import { stringToPackageNameFormat, validatePackageName } from '../utils/string-utils'

const ANDROID_APP_ID_QUESTION = 'What is your group name'
const FLUTTER_APP_ID_QUESTION = 'What\'s your group name/app id'
const IOS_APP_ID_QUESTION = 'What\'s your app id'

/**
 * COMMON_FLAGS
 * Flags for common configuration
 */
export const COMMON_FLAGS = {
    internet_permission: flags.boolean({description: 'Wether or not needs internet access'}),
    overwrite_dest: flags.boolean({description: 'Wether or not overwrite destination folder'}),
}

/**
 * commonCheckFlags
 * @param args args passed to CLI
 * @returns Wether or not args are correct
 * @summary It will check args values and return true if they are valid
 * Otherwise it will return false
 */
export function commonCheckFlags(args: any): boolean {
    return stripAnsi.default(args.app_name) !== '' && validatePackageName(args.app_id) === true
}

/**
 * commonConfigFromArgsFlags
 * @param args args passed to CLI
 * @param flags flags passed to CLI
 * @param configuration user configuration
 * @summary It will set specific configuration for Android using flags values
 */
export function commonConfigFromArgsFlags(args: any, flags: any, configuration: Configuration): void {
    configuration.app_id = args.app_id + '.' + stringToPackageNameFormat(args.app_name)
    configuration.app_name = args.app_name
    configuration.internet_permission = flags.internet_permission
}

/**
 * commonConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for iOS specific configuration using InquirerJS
 */
export async function commonConfigForm(configuration: Configuration, isFlutterAvailable: boolean): Promise<boolean> {
    // Prompt for platform target

    // Retrieve available platform
    // We map the retrieved platform to be compliant with InquirerJS format
    const platform_list = Object.keys(PlatformType).map(key => ({ name: key, value: (PlatformType as any)[key] }))

    // If Flutter is not installed we remove it from the list
    if (!isFlutterAvailable) {
        const flutterIndex = platform_list.findIndex(obj => obj.value === PlatformType.Flutter)
        platform_list.splice(flutterIndex, 1)
    }

    let platform: any = await inquirer.prompt([
        {
            type: 'list',
            name: 'value',
            message: 'Select a target platform',
            choices: platform_list,
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
            validate(name): boolean {
                name = stripAnsi.default(name)
                return name !== ''
            },
            default(): string {
                return chalkPipe('orange')(DEFAULT_PACKAGE_NAME)
            },
            transformer(str): string {
                return chalkPipe('orange')(str)
            },
            filter(str): string {
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
            transformer(input): string {
                if (input !== '') {
                    let tmp = input.split('.')
                    if (tmp.length < 3) {
                        return `${chalkPipe('yellow')(input)}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
                    } else {
                        return`${chalkPipe('yellow')(tmp.slice(0, -1).join('.'))}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
                    }
                }
                return ''
            },
            default(): string {
                return `${chalkPipe('yellow')(DEFAULT_GROUP_NAME)}.${chalkPipe('orange')(stringToPackageNameFormat(configuration.app_name))}`
            },
            filter(str): string {
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
export async function overwriteDestDirForm(configuration: Configuration): Promise<boolean> {
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
function getQuestionGroupNameOrAppId(configuration: Configuration): string {
    switch (configuration.platform_configuration.platform) {
        case(PlatformType.Android): return ANDROID_APP_ID_QUESTION
        case(PlatformType.Flutter): return FLUTTER_APP_ID_QUESTION
        case(PlatformType.iOS): return IOS_APP_ID_QUESTION
    }
}
