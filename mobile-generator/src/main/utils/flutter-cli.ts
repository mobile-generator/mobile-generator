import * as inquirer from 'inquirer'
import { lookpath } from 'lookpath'

/**
 * checkingLoader
 * @summary It will display loader whilst  executing flutter commands
 */
export function checkingLoader() {
    const loader = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let i = 10
    let ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % loader.length] + ' Installing' })

    setInterval(() => {
        ui.updateBottomBar(loader[i++ % loader.length] + ' Installing')
    }, 100)
}

/**
 * flutterIsInstalled
 * @returns It will returns a promise which resolve as true if flutter is installed
 * otherwise it will resolve as false
 * @summary It will check if flutter is installed
 */
export async function flutterIsInstalled() {
    const path = await lookpath('flutter')

    // path will be undefined if `flutter` is not found in path
    if (path) {
        return true
    }
    return false
}
