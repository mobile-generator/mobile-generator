import { expect } from '@oclif/test'

import { Configuration } from '../../../src/main/configuration/configuration'
import { PlatformType, TemplateType } from '../../../src/main/configuration/enum'

describe('Configuration', function () {
    const configuration = new Configuration()
    const configuration_android = new Configuration()
    const configuration_flutter = new Configuration()
    const configuration_ios = new Configuration()

    configuration_android.platform_configuration.platform = PlatformType.Android
    configuration_flutter.platform_configuration.platform = PlatformType.Flutter
    configuration_ios.platform_configuration.platform = PlatformType.IOS

    configuration.platform_configuration.template = TemplateType.Drawer
    configuration_android.platform_configuration.template = TemplateType.Tabbar
    configuration_ios.platform_configuration.template = TemplateType.SingleView

    describe('new', function () {
        it('instance with default value', function () {
            expect(configuration.app_name).to.be.string('my-App')
            expect(configuration.app_id).to.be.string('com.mycompany.my_app')
        })
    })

    describe('toString()', function () {
        it('display config', function () {
            expect(configuration.toString()).to.contain('Configuration {')
        })
    })

    describe('getTemplateDirName()', function () {
        it('display config', function () {
            expect(configuration.getTemplateDirName()).to.be.string('android-drawer-template')
            expect(configuration_android.getTemplateDirName()).to.contain('android-tabbar-template')
            expect(configuration_ios.getTemplateDirName()).to.contain('ios-single-view-template')
        })
    })
})
