import { expect } from '@oclif/test'

/**
 * TODO: fix resolveJsonModule issue with test file
 * import * as ANDROID_CONF from '../../../ressource/config/android.json'
 * import * as FLUTTER_CONF from '../../../ressource/config/flutter.json'
 * import * as IOS_CONF from '../../../ressource/config/ios.json'
 */

import { ConstantPlatformConfiguration } from '../../../src/main/configuration/constant-platform-configuration'
import { PlatformType } from '../../../src/main/configuration/enum'

describe('ConstantPlatformConfiguration', function () {
    let configuration = ConstantPlatformConfiguration.fromPlatformType(PlatformType.Android)

    describe('fromPlatformType', function () {
        it('instance with default value', function () {
            //expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.Android)).to.equal(ANDROID_CONF)
            //expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.Flutter)).to.equal(FLUTTER_CONF)
            //expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.iOS)).to.equal(IOS_CONF)

            expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.Android).platform).to.be.equal(PlatformType.Android)
            expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.Flutter).platform).to.be.equal(PlatformType.Flutter)
            expect(ConstantPlatformConfiguration.fromPlatformType(PlatformType.iOS).platform).to.be.equal(PlatformType.iOS)
        })
    })

    describe('new', function () {
        it('instance with default value', function () {
            expect(configuration.platform).to.equal(PlatformType.Android)

        })
    })
})
