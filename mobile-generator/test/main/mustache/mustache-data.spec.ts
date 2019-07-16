import { expect } from '@oclif/test'
import { readFileSync } from 'fs-extra'

import { Configuration } from '../../../src/main/configuration/configuration'
import { ConstantPlatformConfiguration } from '../../../src/main/configuration/constant-platform-configuration';
import { PlatformType } from '../../../src/main/configuration/enum'
import { MustacheData } from '../../../src/main/mustache/mustache-data'

describe('MustacheData', function () {
    const configuration = new Configuration()
    const iosConf = ConstantPlatformConfiguration.fromPlatformType(PlatformType.IOS)

    configuration.app_name = 'test-App'
    configuration.app_id = 'com.testcompany.test_app'
    configuration.internet_permission = false
    configuration.platform_configuration.platform = iosConf.platform
    configuration.platform_configuration.sdk_min_version = iosConf.sdk_min_version
    configuration.platform_configuration.template = iosConf.template[0]

    const mustacheData = MustacheData.fromConfiguration(configuration)

    const configuration_2 = new Configuration()
    const androidConf = ConstantPlatformConfiguration.fromPlatformType(PlatformType.Android)

    configuration_2.app_name = 'test-App'
    configuration_2.app_id = 'com.testcompany.test_app'
    configuration_2.internet_permission = true
    configuration_2.platform_configuration.platform = androidConf.platform
    configuration_2.platform_configuration.sdk_min_version = androidConf.sdk_min_version
    configuration_2.platform_configuration.template = androidConf.template[0]

    const mustacheData_2 = MustacheData.fromConfiguration(configuration_2)

    describe('fromConfiguration ios', function () {
        it('instance with default value', function () {
            expect(mustacheData.app_name).to.be.string('test-App')
            expect(mustacheData.app_id).to.be.string('com.testcompany.test_app')
            expect(mustacheData.internet_permission).to.be.string('false')
            expect(mustacheData.min_version).to.be.string(iosConf.sdk_min_version.toString())
            expect(mustacheData.template).to.be.string(iosConf.template[0].toString())
        })
    })

    describe('fromConfiguration android', function () {
        it('instance with default value', function () {
            expect(mustacheData_2.internet_permission).to.be.string('true')
            expect(mustacheData_2.android_strings_content).to.be.string(readFileSync(__dirname + '/../../../src/ressource/component/android-strings-content.txt').toString())
            expect(mustacheData_2.android_default_imports).to.be.string(readFileSync(__dirname + '/../../../src/ressource/component/android-default-imports.txt').toString())
            expect(mustacheData_2.android_default_colors).to.be.string(readFileSync(__dirname + '/../../../src/ressource/component/android-default-colors.txt').toString())
        })
    })
})
