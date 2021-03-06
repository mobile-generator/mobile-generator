import { expect } from '@oclif/test'

import { SdkVersion } from '../../../src/main/configuration/sdk-version'

describe('SdkVersion', function (): void {
    let sdk_0 = new SdkVersion()
    let sdk_1 = new SdkVersion(1, 1)
    let sdk_2 = new SdkVersion(2, 2)
    let sdk_3 = new SdkVersion(2, 3)

    describe('new', function (): void {
        it('instance with default value', function (): void {
            expect(sdk_0.version_major).to.equal(0)
            expect(sdk_0.version_minor).to.equal(0)
        })
    })

    describe('compare()', function (): void {
        it('compare different SdkVersion', function (): void {
            expect(sdk_1.compare(sdk_0)).to.be.above(0)
            expect(sdk_1.compare(sdk_1)).to.be.equal(0)
            expect(sdk_1.compare(sdk_2)).to.be.below(0)
            expect(sdk_2.compare(sdk_3)).to.be.below(0)
        })
    })

    describe('toString()', function (): void {
        it('display SdkVersion', function (): void {
            expect(sdk_0.toString()).to.be.string('0')
            expect(sdk_1.toString()).to.be.string('1.1')

        })
    })
})
