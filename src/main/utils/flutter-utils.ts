const chalkPipe = require('chalk-pipe')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

import { lookpath } from 'lookpath'

import { Configuration } from '../configuration/configuration'

import { FLUTTER_CREATE_ERROR, FLUTTER_CREATE_SUCCESS, FLUTTER_ERROR } from './constants'
import { Loader } from './loader'
import { stringToPackageNameFormat } from './string-utils'

/**
 * flutterIsInstalled
 * @returns It will returns a promise which resolve as true if flutter is installed
 * otherwise it will resolve as false
 * @summary It will check if flutter is installed
 */
export async function flutterIsInstalled(): Promise<boolean> {
    const path = await lookpath('flutter')

    // path will be undefined if `flutter` is not found in path
    if (path) {
        return true
    }
    return false
}

export async function createFlutterProject(configuration: Configuration, directory: string): Promise<boolean> {
    const loader = Loader.startWithMessage(' Creating Flutter project')
    return new Promise<boolean>(async function (resolve, reject): Promise<void> {
        const command = `flutter create -i swift -a kotlin -t app --org ${configuration.getGroupName()} --project-name ${stringToPackageNameFormat(configuration.app_name)} ${directory}`
        const { stderr } = await exec(command)
        if (stderr) {
            console.log(chalkPipe('red.bold')(FLUTTER_CREATE_ERROR + command))
            console.log(chalkPipe('red.bold')(FLUTTER_ERROR + stderr))
            reject(false)
        } else {
            loader.stop(FLUTTER_CREATE_SUCCESS)
            resolve(true)
        }
    })
}
