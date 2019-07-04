import { Command, flags } from '@oclif/command'

import { Configuration } from '../main/configuration/configuration'
import { renderProject } from '../main/mustache/mustache'
import { RequireConfiguration } from '../main/requirements/require-configuration'
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

  // Create new require configuration with default values
  require_configuration = new RequireConfiguration()

  async run() {
    // const { args, flags } = this.parse(Create)

    // Check requirements
    await this.require_configuration.checkRequirements()

    // Check if it's all good
    // N.B. : some requirements can be blocking others don't
    if (this.require_configuration.isAllGood()) {
      // Retrieve common config to all platform
      await commonConfigForm(this.configuration, this.require_configuration.isFlutterAvailable).then(async () =>

        // Retrieve config specific to chosen platform
        specificPlatformConfigForm(this.configuration).then(async () => {
          // Check if output directory already exist
          if (await checkDirectory(this.configuration)) {
            // Ask user if he wants to overwrite it
            await overwriteDestDirForm(this.configuration).then(overwrite => {
              if (overwrite) {
                // If user wants to overwrite it, we delete all contents
                cleanDestDir(this.configuration)
              } else {
                process.exit(0)
              }
            }, () => {
              throw new Error('Error during overwrite dest dir')
            })
          }
          // Output results
          await renderProject(this.configuration)
        },
          () => {
            throw new Error('Error during specific config')
          })
        , () => {
          throw new Error('Error during common config')
        })
    }
    process.exit(0)
  }
}
