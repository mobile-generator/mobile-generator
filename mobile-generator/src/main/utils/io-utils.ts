import { readdirSync, unlinkSync } from 'fs'
import { copy, ensureDir, ensureDirSync, mkdtemp, remove } from 'fs-extra'
import * as path from 'path'

import { Configuration } from '../configuration/configuration'

import { cleanString } from './string-utils'

/**
 * @method checkDirectory
 * @param dirPath the directory's path to check
 * @returns
 *  It will return true if the directory exist and is not empty
 *  If directory doesn't exist, it will create it and return false
 *  If directory exist but is empty, it will return false
 * @summary It will check wether or not the directory exist
 */
export function checkDirectory(configuration: Configuration) {
    const dirPath = path.join(process.cwd() + '/' + cleanString(configuration.app_name) + '/' + cleanString(configuration.platform_configuration.platform))
    // Create directory if it doesn't exist
    ensureDirSync(dirPath)

    if (readdirSync(dirPath).length !== 0) {
        return true
    }
    return false
}

/**
 * cleanDestDir
 * @param configuration user configuration
 * @summary Remove all contents of the destination directory
 */
export function cleanDestDir(configuration: Configuration) {
    // Retrieve destination directory path
    const dir = path.join(process.cwd() + '/' + configuration.app_name + '/' + configuration.platform_configuration.platform)
    // Retrieve destination directory content
    const contents = readdirSync(dir)

    // Loop through all files and directories and remove them
    for (const item of contents) {
        // Remove file
        unlinkSync(path.join(dir, item))
    }
}

/**
 * createTempDir
 * @param configuration user configuration
 * @returns The promise will resolve as true if there are no errors.
 * @summary
 * otherwise it will reject the promise with the error inside
 * Create temporary directory inside /tmp with an unique name
 */
export function createTempDir(configuration: Configuration) {
    return new Promise<string>(function (resolve, reject) {
        // Create temporary unique directory with application name as prefix
        mkdtemp('/tmp/' + configuration.app_name, (err, path) => {
            if (err) {
                reject(err)
            }

            // Create path for current application and platform
            const tempDirPath = path + '/' + cleanString(configuration.platform_configuration.platform)

            // Create corresponding directory for chosen platform
            ensureDir(tempDirPath).then(() => {
                resolve(path)
            },
                err => {
                    reject(err)
                })
        })
    })
}

/**
 * moveTempDirToDest
 * @param configuration user configuration
 * @param tempDir temporary directory path
 * @summary
 * Move temporary directory to destination directory
 * then it removes temporary directory
 */
export function moveTempDirToDest(configuration: Configuration, tempDir: string) {
    return new Promise<boolean>(function (resolve, reject) {
        copy(tempDir, process.cwd() + '/' + configuration.app_name).then(
            () => {
                remove(tempDir).then(
                    () => resolve(true),
                    err => reject(err)
                )
            },
            err => reject(err)
        )
    })
}
