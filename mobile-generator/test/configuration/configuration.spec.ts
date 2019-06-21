import { expect } from '@oclif/test'

import { Configuration } from '../../src/main/configuration/configuration'

describe('Configuration', function () {
    let configuration = new Configuration()

    describe('new', function () {
        it('instance with default value', function () {
            expect(configuration.app_name).to.equal('')
            expect(configuration.app_id).to.equal('')
        })
    })

    describe('toString()', function () {
        it('display config', function () {
            expect(configuration.toString()).to.contain('Configuration {')
        })
    })
})
