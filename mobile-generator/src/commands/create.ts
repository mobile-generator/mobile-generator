import { Command, flags } from '@oclif/command'

import { Configuration } from '../main/configuration/configuration'
import { renderProject } from '../main/mustache/mustache'
import { commonConfigForm, overwriteDestDirForm } from '../main/user-input/user-input-common'
import { specificPlatformConfigForm } from '../main/user-input/user-input-specific'
import { checkDirectory, cleanDestDir } from '../main/utils/io-utils'

export default class Create extends Command {
  static description = 'This command is used to create a new template. You need to give the targeted platform and app name'

  static examples = [
    '$ mobile-generator create',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []

  configuration = new Configuration()

  async run() {
    // const { args, flags } = this.parse(Create)

    commonConfigForm(this.configuration).then(() =>
      specificPlatformConfigForm(this.configuration).then(() => {
        if (checkDirectory(this.configuration)) {
          overwriteDestDirForm(this.configuration).then(() => {
            cleanDestDir(this.configuration)
          }, () => {
            throw new Error('Error during overwrite dest dir')
          })
        }
        renderProject(this.configuration)
      },
        () => {
          throw new Error('Error during specific config')
        })
      , () => {
        throw new Error('Error during common config')
      })
  }
}
