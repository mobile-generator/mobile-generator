import { expect } from '@oclif/test'

import { cleanString, stringToPackageNameFormat, validatePackageName } from '../../../src/main/utils/string-utils'

describe('MustacheData', function (): void {
    describe('cleanString', function (): void {
        it('test', function (): void {
            expect(cleanString('my-App')).to.be.string('my-app')
        })
    })

    describe('stringToPackageNameFormat', function (): void {
        it('test', function (): void {
            expect(stringToPackageNameFormat('my-App')).to.be.string('my_app')
            expect(stringToPackageNameFormat('my-AppIsSo_GreAt')).to.be.string('my_appisso_great')
        })
    })

    describe('validatePackageName', function (): void {
        it('test', function (): void {
            expect(validatePackageName('com.mycompany.my_app')).to.equal(true)
            expect(validatePackageName('com.mycompany.my_package.my_app')).to.equal(true)
            expect(validatePackageName('com.my_app')).to.equal(true)
            expect(validatePackageName('com.mycompany.my-App')).to.be.not.equal(true)

        })
    })
})
