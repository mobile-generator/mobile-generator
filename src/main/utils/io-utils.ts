import { readdirSync } from 'fs'
import { copy, ensureDir, ensureDirSync, mkdtemp, remove, removeSync } from 'fs-extra'
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
export async function checkDirectory(configuration: Configuration): Promise<boolean> {
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
export function cleanDestDir(configuration: Configuration): void {
    // Retrieve destination directory path
    const dir = path.join(process.cwd() + '/' + configuration.app_name + '/' + cleanString(configuration.platform_configuration.platform))

    // Loop through all files and directories and remove them
    for (const item of readdirSync(dir)) {
        // Remove file
        removeSync(path.join(dir, item))
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
export function createTempDir(configuration: Configuration): Promise<string> {
    return new Promise<string>(function (resolve, reject): void {
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
export function moveTempDirToDest(configuration: Configuration, tempDir: string): Promise<boolean> {
    return new Promise<boolean>(function (resolve, reject): void {
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
