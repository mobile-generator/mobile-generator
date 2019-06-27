import { Command, flags } from '@oclif/command'

import { Configuration } from '../main/configuration/configuration'
import { renderProject } from '../main/mustache/mustache'
import { commonConfigForm, overwriteDestDirForm } from '../main/user-input/user-input-common'
import { specificPlatformConfigForm } from '../main/user-input/user-input-specific'
import { checkDirectory, cleanDestDir } from '../main/utils/io-utils'

/**
 * This class represent the create command.
 * This command is available through the CLI
 */
export default class Create extends Command {
  // Description of the command
  static description = 'This command is used to create a new template. You need to give the targeted platform and app name'

  // Usage example
  static examples = [
    '$ mobile-generator create',
  ]

  // Flags available
  static flags = {
    help: flags.help({ char: 'h' }),
  }

  // Args needed
  static args = []

  // Create new user configuration with default values
  configuration = new Configuration()

  async run() {
    // const { args, flags } = this.parse(Create)

    // Retrieve common config to all platform
    commonConfigForm(this.configuration).then(() =>

    // Retrieve config specific to chosen platform
      specificPlatformConfigForm(this.configuration).then(() => {
        // Check if output directory alread exist
        if (checkDirectory(this.configuration)) {
          // Ask user if he wants to overwrite it
          overwriteDestDirForm(this.configuration).then(() => {
            // If user wants to overwrite it, we delete all contents
            cleanDestDir(this.configuration)
          }, () => {
            throw new Error('Error during overwrite dest dir')
          })
        }
        // Output results
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
