import { readdir, stat } from 'fs'
import { ensureDirSync, readFileSync, writeFileSync } from 'fs-extra'
import * as Mustache from 'mustache'
import * as path from 'path'

import { Configuration } from '../configuration/configuration'
import { PlatformType } from '../configuration/enum'
import { BLACKLIST_EXTENSION, ERROR_PARSING_TEMPLATE, ERROR_RETRIEVING_INFO, GIT_IGNORE, NPM_IGNORE } from '../utils/constants'
import { createFlutterProject } from '../utils/flutter-utils'
import { createTempDir, moveTempDirToDest } from '../utils/io-utils'
import { cleanString } from '../utils/string-utils'

import { MustacheData } from './mustache-data'

const PATH_TO_TEMPLATE = '/../../ressource/template/'

/**
 * @method mustacheFile
 * @param src source file which contains template code with Mustache
 * @param dest destination file to output filled template
 * @param config contains configuration which will replace values in the template file
 * @summary Fill in template file according to user configuration
 */
export function mustacheFile(src: string, dest: string, config: MustacheData): void {
    writeFileSync(dest, Mustache.render(readFileSync(src).toString(), config))
}

/**
 * renderFile
 * @param src source directory
 * @param dest output directory
 * @param config contains configuration which will replace values in the template file
 * @summary Rename file if necessary, mustache it if necessary
 */
function renderFile(src: string, dest: string, config: MustacheData): void {
    // NPM automatically renames .gitignore to .npmignore when pushing source files
    // To avoid any issue with the template we force the renaming
    if (src.endsWith(NPM_IGNORE)) {
        src.replace(NPM_IGNORE, GIT_IGNORE)
    }

    // We check if the file is blacklisted (see `checkFileExtension` doc)
    if (checkFileExtension(src)) {
        // Render filename
        let renderedDest = Mustache.render(dest, config)
        // Render file contents
        mustacheFile(src, renderedDest, config)
    }
}

/**
 * renderFile
 * @param src source directory
 * @param dest output directory
 * @param config contains configuration which will replace values in the template file
 * @summary mustache directory name if necessary, and render its content
 */
function renderDirectory(src: string, dest: string, config: MustacheData): void {
    // Render directory name
    let renderedDest = Mustache.render(dest, config)
    ensureDirSync(renderedDest)
    // Check if we need to create package name's folder tree
    renderedDest = buildAppIdTreeIfNecessary(renderedDest, config.app_id)
    // Render directory contents
    mustacheDirectory(src, renderedDest, config)
}

/**
 * mustacheDirectory
 * @param src source directory
 * @param dest output directory
 * @param config contains configuration which will replace values in the template file
 * @summary Fill in template directory according to user configuration
 */
export function mustacheDirectory(src: string, dest: string, config: MustacheData): void {
    readdir(src, function (err, files): void {
        if (err) {
            // Error whilst parsing folder
            process.exit(ERROR_PARSING_TEMPLATE)
        }

        // Loop through all the directories / files inside the current directory
        files.forEach(function (file): void {
            const srcPath = path.join(src, file)
            const destPath = path.join(dest, file)

            // This will retrieve the information about folder / file
            stat(srcPath, function (error, stat): void {
                if (!error) {
                    if (stat.isFile()) {
                        renderFile(srcPath, destPath, config)
                    } else if (stat.isDirectory()) {
                        renderDirectory(srcPath, destPath, config)
                    }
                } else {
                    // Error whilst retrieving information
                    process.exit(ERROR_RETRIEVING_INFO)
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
function checkFileExtension(file: string): boolean {
    const extension = path.extname(file).split('.', 2)[1]

    return !BLACKLIST_EXTENSION.includes(extension)
}

/**
 * buildAppIdTreeIfNecessary
 * @param directory directory path to check
 * @param package_name package name
 * @summary This function will create folder tree according to package name
 */
function buildAppIdTreeIfNecessary(directory: string, package_name: string): string {
    /* Package name's folder tree are under :
     * `.../src/androidTest/java/`
     * `.../src/main/java/`
     * `.../src/test/java/`
     */

    // We check if current directory is java
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
export async function renderProject(config: Configuration): Promise<boolean> {
    return new Promise<boolean>(async function (resolve, reject): Promise<void> {
        // Create temporary directory in /tmp with unique name
        createTempDir(config).then(async path => {
            const tempPath = path + '/' + cleanString(config.platform_configuration.platform)

            if (config.platform_configuration.platform === PlatformType.Flutter) {
                await createFlutterProject(config, tempPath).catch(() => reject(false))
            } else {
                // Render project inside the temporary directory
                mustacheDirectory(__dirname + PATH_TO_TEMPLATE + config.getTemplateDirName(), tempPath, MustacheData.fromConfiguration(config))
            }

            // Move project from temp dir to real dest dir
            await moveTempDirToDest(config, path).catch(() => reject(false))

            resolve(true)
        }, () => reject(false))
    })
}
