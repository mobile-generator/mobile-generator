import { expect } from '@oclif/test'

import { Configuration } from '../../../src/main/configuration/configuration'
import { PlatformType, TemplateType } from '../../../src/main/configuration/enum'
import { DEFAULT_APP_ID, DEFAULT_APP_NAME, DEFAULT_GROUP_NAME } from '../../../src/main/utils/constants'

describe('Configuration', function (): void {
    const configuration = new Configuration()
    const configuration_android = new Configuration()
    const configuration_flutter = new Configuration()
    const configuration_ios = new Configuration()

    configuration_android.platform_configuration.platform = PlatformType.Android
    configuration_flutter.platform_configuration.platform = PlatformType.Flutter
    configuration_ios.platform_configuration.platform = PlatformType.iOS

    configuration.platform_configuration.template = TemplateType.Drawer
    configuration_android.platform_configuration.template = TemplateType.Tabbar
    configuration_ios.platform_configuration.template = TemplateType.SingleView

    describe('new', function (): void {
        it('instance with default value', function (): void {
            expect(configuration.app_name).to.be.string(DEFAULT_APP_NAME)
            expect(configuration.app_id).to.be.string(DEFAULT_APP_ID)
        })
    })

    describe('toString()', function (): void {
        it('display config', function (): void {
            expect(configuration.toString()).to.contain('Configuration {')
        })
    })

    describe('getTemplateDirName()', function (): void {
        it('display config', function (): void {
            expect(configuration.getTemplateDirName()).to.be.string('android-drawer-template')
            expect(configuration_android.getTemplateDirName()).to.contain('android-tabbar-template')
            expect(configuration_ios.getTemplateDirName()).to.contain('ios-single-view-template')
        })
    })

    describe('getGroupName()', function (): void {
        it('display config', function (): void {
            expect(configuration.getGroupName()).to.be.string(DEFAULT_GROUP_NAME)
        })
    })
})
