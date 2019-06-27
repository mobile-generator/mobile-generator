import { expect } from '@oclif/test'

/**
 * TODO: fix resolveJsonModule issue with test file
 * import * as ANDROID_CONF from '../../../ressource/config/android.json'
 * import * as FLUTTER_CONF from '../../../ressource/config/flutter.json'
 * import * as IOS_CONF from '../../../ressource/config/ios.json'
 */

import { PlatformType } from '../../../src/main/configuration/enum'
import { UserPlatformConfiguration } from '../../../src/main/configuration/user-platform-configuration'

describe('UserPlatformConfiguration', function () {
    let configuration = UserPlatformConfiguration.fromPlatformType(PlatformType.Android)

    describe('fromPlatformType', function () {
        it('instance with default value', function () {
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Android)).to.equal(ANDROID_CONF)
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Flutter)).to.equal(FLUTTER_CONF)
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.IOS)).to.equal(IOS_CONF)

            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Android).platform).to.be.equal(PlatformType.Android)
            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Flutter).platform).to.be.equal(PlatformType.Flutter)
            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.IOS).platform).to.be.equal(PlatformType.IOS)
        })
    })

    describe('new', function () {
        it('instance with default value', function () {
            expect(configuration.platform).to.equal(PlatformType.Android)

        })
    })
})
