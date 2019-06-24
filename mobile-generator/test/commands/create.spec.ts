import { expect, test } from '@oclif/test'

describe('Create commands', function () {
    test
    .stdout()
    .command(['create', '--help'])
    .exit(0)
    .do(output => expect(output.stdout).to.contain('This command is used to create a new template'))
    .it()
})
