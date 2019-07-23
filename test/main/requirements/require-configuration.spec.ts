import { expect } from '@oclif/test'

import { RequireConfiguration } from '../../../src/main/requirements/require-configuration'

describe('RequireConfiguration', function () {
    const requireConfiguration = new RequireConfiguration()

    describe('new', function () {
        it('instance with default value', function () {
            expect(requireConfiguration.isFlutterAvailable).to.be.equal(false)
        })
    })

    describe('checkRequirements()', function () {
        process.env.PATH = ''
        requireConfiguration.checkRequirements().then(() => {
            expect(requireConfiguration.isFlutterAvailable).to.be.equal(false)
        }).catch(() => {})
    })

    describe('isAllGood()', function () {
        it('test', function () {
            expect(requireConfiguration.isAllGood()).to.be.equal(true)
        })
    })
})
