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

export function cleanDestDir(configuration: Configuration) {
    const dir = path.join(process.cwd() + '/' + configuration.app_name + '/' + configuration.platform_configuration.platform)
    const contents = readdirSync(dir)

    for (const item of contents) {
        unlinkSync(path.join(dir, item))
    }
}

export function createTempDir(configuration: Configuration) {
    return new Promise<string>(function (resolve, reject) {
        mkdtemp('/tmp/' + configuration.app_name, (err, path) => {
            if (err) {
                reject(err)
            }

            const tempDirPath = path + '/' + cleanString(configuration.platform_configuration.platform)

            ensureDir(tempDirPath).then(() => {
                resolve(path)
            },
                err => {
                    reject(err)
                })
        })
    })
}

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
