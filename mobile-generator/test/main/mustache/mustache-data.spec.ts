import { expect } from '@oclif/test'

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

    describe('fromConfiguration', function () {
        it('instance with default value', function () {
            expect(mustacheData.app_name).to.be.string('test-App')
            expect(mustacheData.app_id).to.be.string('com.testcompany.test_app')
            expect(mustacheData.internet_permission).to.be.string('false')
            expect(mustacheData.min_version).to.be.string(iosConf.sdk_min_version.toString())
            expect(mustacheData.template).to.be.string(iosConf.template[0].toString())
        })
    })
})
