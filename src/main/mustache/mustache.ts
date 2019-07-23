import { readdir, stat } from 'fs'
import { ensureDirSync, readFileSync, writeFileSync } from 'fs-extra'
import * as Mustache from 'mustache'
import * as path from 'path'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { createFlutterProject } from '../utils/flutter-utils'
import { createTempDir, moveTempDirToDest } from '../utils/io-utils'
import { cleanString } from '../utils/string-utils'

import { MustacheData } from './mustache-data'

/**
 * @method mustacheFile
 * @param src source file which contains template code with Mustache
 * @param dest destination file to output filled template
 * @param config contains configuration which will replace values in the template file
 * @summary Fill in template file according to user configuration
 */
export function mustacheFile(src: string, dest: string, config: MustacheData) {
    writeFileSync(dest, Mustache.render(readFileSync(src).toString(), config))
}

/**
 * mustacheDirectory
 * @param src source directory
 * @param dest output directory
 * @param config contains configuration which will replace values in the template file
 * @summary Fill in template directory according to user configuration
 */
export function mustacheDirectory(src: string, dest: string, config: MustacheData) {
    readdir(src, function (err, files) {
        if (err) {
            // Error whilst parsing folder
            process.exit(1)
        }

        // Loop through all the directories / files inside the current directory
        files.forEach(function (file) {
            let srcPath = path.join(src, file)
            let destPath = path.join(dest, file)

            // This will retrieve the information about folder / file
            stat(srcPath, function (error, stat) {
                if (error) {
                    // Error whilst retrieving information
                    return 'Can not retrieve information'
                }

                if (stat.isFile()) {
                    // We check if the file is blacklisted (see `checkFileExtension` doc)

                    // NPM automatically renames .gitignore to .npmignore when pushing source files
                    // To avoid any issue with the template we force the renaming
                    if (srcPath.endsWith('.npmignore')) {
                        srcPath.replace('.npmignore', '.gitignore')
                    }

                    if (checkFileExtension(srcPath)) {
                        // Render filename
                        let renderedDest = Mustache.render(destPath, config)
                        // Render file contents
                        mustacheFile(srcPath, renderedDest, config)
                    }

                } else if (stat.isDirectory()) {
                    // Render directory name
                    let renderedDest = Mustache.render(destPath, config)
                    ensureDirSync(renderedDest)
                    // Check if we need to create package name's folder tree
                    renderedDest = buildAppIdTreeIfNecessary(renderedDest, config.app_id)
                    // Render directory contents
                    mustacheDirectory(srcPath, renderedDest, config)
                }
            })
        })
    })
}

/**
 * checkFileExtension
 * @param file filename path with extension
 * @returns returns `true` if the file is not blacklisted otherwise `false`
 * @summary
 * This function will check if the file is in the blacklist
 * and avoid error with Mustache parser.
 */
function checkFileExtension(file: string) {
    let extension = path.extname(file).split('.', 2)[1]
    // Black list
    const BLACKLIST_EXTENSION = ['png', 'jpg', 'jpeg']
    if (BLACKLIST_EXTENSION.includes(extension)) {
        return false
    }
    return true
}

/**
 * buildAppIdTreeIfNecessary
 * @param directory directory path to check
 * @param package_name package name
 * @summary This function will create folder tree according to package name
 */
function buildAppIdTreeIfNecessary(directory: string, package_name: string) {
    /* Package name's folder tree are under :
     * `.../src/androidTest/java/`
     * `.../src/main/java/`
     * `.../src/test/java/`
     */

    // we check if current directory is java
    if (directory.endsWith('java')) {
        directory += '/' + package_name.replace(/\./g, '/')
        ensureDirSync(directory)
    }
    return directory
}

/**
 * renderProject
 * @param config contains the configuration entered by the user
 * @summary This will create the project according to the user setting.
 */
export async function renderProject(config: Configuration) {
    return new Promise<boolean>(async function (resolve, reject) {
        // Create temporary directory in /tmp with unique name
        createTempDir(config).then(async path => {
            const tempPath = path + '/' + cleanString(config.platform_configuration.platform)

            if (config.platform_configuration.platform === PlatformType.Flutter) {
                await createFlutterProject(config, tempPath).catch(() => reject(false))
            } else {
                // Render project inside the temporary directory
                mustacheDirectory(__dirname + '/../../ressource/template/' + config.getTemplateDirName(), tempPath, MustacheData.fromConfiguration(config))
            }

            // Move project from temp dir to real dest dir
            await moveTempDirToDest(config, path).catch(() => reject(false))

            resolve(true)
        }, () => reject(false))
    })
}
