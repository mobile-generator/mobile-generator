import * as inquirer from 'inquirer'
import * as util from 'util'

export function checkingLoader() {
    const loader = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    let i = 10
    let ui = new inquirer.ui.BottomBar({ bottomBar: loader[i % loader.length] + ' Installing' })

    setInterval(() => {
        ui.updateBottomBar(loader[i++ % loader.length] + ' Installing')
    }, 100)
}

export function flutterIsInstalled() {
    const exec = util.promisify(require('child_process').exec)
    const { _stdout, stderr } = exec('flutter --version')

    if (stderr.endsWith('command not found')) {
        return false
    } else {
        return true
    }
}

export function installFlutter() {
    console.log('installing flutter')
}