import * as inquirer from 'inquirer'

import { flutterIsInstalled, installFlutter } from '../utils/flutter-cli';

/**
 * flutterConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for Flutter specific configuration using InquirerJS
 */
export async function flutterConfigForm() {
    /**
     * TODO:
     * Check if Flutter CLI is in PATH
     * Tell user to add it in path if he downloaded it or
     * Ask user if we can install it 
     * use Flutter CLI to create Flutter project
     */

    if (!flutterIsInstalled()) {

    }

    return true
}


/**
 * flutterAskForInstallation
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask user to install Flutter
 */
export async function flutterAskForInstallation() {
    // Prompt for platform target
    let installation: any = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'value',
            message: 'Do you want to install Flutter ?',
        }
    ])

    if (installation.value) {
        installFlutter()
    }

    return true
}
