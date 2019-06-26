import { Command, flags } from '@oclif/command'

import { Configuration } from '../configuration/configuration'
import { GlobalConfiguration } from '../configuration/global-configuration'
import { renderProject } from '../mustache/mustache'
import { commonConfigForm, overwriteDestDirForm } from '../user-input/user-input-common'
import { specificConfigForm } from '../user-input/user-input-specific'
import { checkDirectory, cleanDestDir } from '../utils/io-utils'

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
  global_configuration = new GlobalConfiguration()

  async run() {
    // const { args, flags } = this.parse(Create)

    commonConfigForm(this.configuration).then(() =>
      specificConfigForm(this.configuration).then(() => {
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
