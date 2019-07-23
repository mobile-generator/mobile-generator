import { expect } from '@oclif/test'

/**
 * TODO: fix resolveJsonModule issue with test file
 * import * as ANDROID_CONF from '../../../ressource/config/android.json'
 * import * as FLUTTER_CONF from '../../../ressource/config/flutter.json'
 * import * as IOS_CONF from '../../../ressource/config/ios.json'
 */

import { PlatformType } from '../../../src/main/configuration/enum'
import { UserPlatformConfiguration } from '../../../src/main/configuration/user-platform-configuration'

describe('UserPlatformConfiguration', function (): void {
    let configuration = UserPlatformConfiguration.fromPlatformType(PlatformType.Android)

    describe('fromPlatformType', function (): void {
        it('instance with default value', function (): void {
            // We should test it like this
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Android)).to.equal(ANDROID_CONF)
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Flutter)).to.equal(FLUTTER_CONF)
            //expect(UserPlatformConfiguration.fromPlatformType(PlatformType.iOS)).to.equal(IOS_CONF)

            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Android).platform).to.be.equal(PlatformType.Android)
            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.Flutter).platform).to.be.equal(PlatformType.Flutter)
            expect(UserPlatformConfiguration.fromPlatformType(PlatformType.iOS).platform).to.be.equal(PlatformType.iOS)
        })
    })

    describe('new', function (): void {
        it('instance with default value', function (): void {
            expect(configuration.platform).to.equal(PlatformType.Android)

        })
    })
})
