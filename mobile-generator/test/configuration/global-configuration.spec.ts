import { expect } from '@oclif/test'

import { PlatformType } from '../../src/main/configuration/enum'
import { GlobalConfiguration } from '../../src/main/configuration/global-configuration'

describe('GlobalConfiguration', function () {
    let configuration = new GlobalConfiguration()

    describe('getPlatformConfiguration', function () {
        it('initialize with correct values', function () {
            expect(configuration.getPlatformConfiguration(PlatformType.Android).platform).to.be.equal(PlatformType.Android)
            expect(configuration.getPlatformConfiguration(PlatformType.Flutter).platform).to.be.equal(PlatformType.Flutter)
            expect(configuration.getPlatformConfiguration(PlatformType.IOS).platform).to.be.equal(PlatformType.IOS)
        })
    })
})
