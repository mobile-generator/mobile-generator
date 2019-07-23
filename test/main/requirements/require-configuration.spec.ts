import { expect } from '@oclif/test'

import { RequireConfiguration } from '../../../src/main/requirements/require-configuration'

describe('RequireConfiguration', function (): void {
    const requireConfiguration = new RequireConfiguration()

    describe('new', function (): void {
        it('instance with default value', function (): void {
            expect(requireConfiguration.isFlutterAvailable).to.be.equal(false)
        })
    })

    describe('checkRequirements()', function (): void {
        process.env.PATH = ''
        requireConfiguration.checkRequirements().then(() => {
            expect(requireConfiguration.isFlutterAvailable).to.be.equal(false)
        }).catch(() => {})
    })

    describe('isAllGood()', function (): void {
        it('test', function (): void {
            expect(requireConfiguration.isAllGood()).to.be.equal(true)
        })
    })
})
