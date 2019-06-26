import { readdir, stat } from 'fs'
import { mkdirSync, readFileSync, writeFileSync } from 'fs-extra'
import * as Mustache from 'mustache'
import * as path from 'path'

import { Configuration } from '../configuration/configuration'
import { createTempDir, moveTempDirToDest } from '../utils/io-utils'
import { cleanString } from '../utils/string-utils'

import { MustacheData } from './mustache-data'

export function mustacheFile(src: string, dest: string, config: MustacheData) {
    writeFileSync(dest, Mustache.render(readFileSync(src).toString(), config))
}

export function mustacheDirectory(src: string, dest: string, config: MustacheData) {
    readdir(src, function (err, files) {
        if (err) {
            process.exit(1)
        }

        files.forEach(function (file) {
            let srcPath = path.join(src, file)
            let destPath = path.join(dest, file)

            stat(srcPath, function (error, stat) {
                if (error) {
                    return
                }

                if (stat.isFile()) {
                    if (checkFileExtension(srcPath)) {
                        let renderedDest = Mustache.render(destPath, config)
                        mustacheFile(srcPath, renderedDest, config)
                    }

                } else if (stat.isDirectory()) {
                    let renderedDest = Mustache.render(destPath, config)
                    mkdirSync(renderedDest)
                    renderedDest = buildAppIdTreeIfNecessary(renderedDest, config.app_id)
                    mustacheDirectory(srcPath, renderedDest, config)
                }
            })
        })
    })
}

function checkFileExtension(file: string) {
    let extension = path.extname(file).split('.', 2)[1]
    const EXTENSION = ['png', 'jpg', 'jpeg']
    if (EXTENSION.includes(extension)) {
        return false
    }
    return true
}

function buildAppIdTreeIfNecessary(directory: string, app_id: string) {
    if (directory.endsWith('java')) {
        app_id.split('.').forEach(value => {
            directory += '/' + value
            mkdirSync(directory)
        })
    }
    return directory
}

export function renderProject(config: Configuration) {
    // Destination path
    const destPath = path.join(process.cwd(), '/', cleanString(config.app_name), '/', cleanString(config.platform_configuration.platform))

    // Create temporary dir

    //const tempDir = '/tmp/' + config.app_name + Math.floor(Math.random() * 900000 + 100000).toString()

    let tempPath = ''
    createTempDir(config).then(path => {
        tempPath = path + '/' + cleanString(config.platform_configuration.platform)

        // Render template
        let data: any = config
        data.platform_configuration.sdk_min_version = config.platform_configuration.sdk_min_version.toString()
        data.platform_configuration.sdk_target_version = config.platform_configuration.sdk_target_version.toString()

        mustacheDirectory(__dirname + '/../ressource/template/' + config.getTemplateDirName(), tempPath, MustacheData.fromConfiguration(config))

        moveTempDirToDest(config, path).then(() => {}, () => {})
    }, err => err)

    //console.log(tempDir)
    //console.log(tempDirPath)
}
