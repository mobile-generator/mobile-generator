const chalkPipe = require('chalk-pipe')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

import { lookpath } from 'lookpath'

import { Configuration } from '../configuration/configuration'

import { Loader } from './loader'
import { stringToPackageNameFormat } from './string-utils'

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

export async function createFlutterProject(configuration: Configuration, directory: string) {
    const loader = Loader.startWithMessage(' Creating Flutter project')
    return new Promise<string>(async function (resolve, reject) {
        const command = `flutter create -i swift -a kotlin -t app --org ${configuration.getGroupName()} --project-name ${stringToPackageNameFormat(configuration.app_name)} ${directory}`
        const { stderr } = await exec(command)
        if (stderr) {
            reject(stderr)
        } else {
            loader.stop(chalkPipe('green.bold')('✓ Installation done!\n'))
            resolve('')
        }
    })
}
