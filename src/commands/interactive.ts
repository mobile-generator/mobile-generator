import { Command, flags } from '@oclif/command'

import { Configuration } from '../main/configuration/configuration'
import { renderProject } from '../main/mustache/mustache'
import { RequireConfiguration } from '../main/requirements/require-configuration'
import { commonConfigForm, overwriteDestDirForm } from '../main/user-input/user-input-common'
import { specificPlatformConfigForm } from '../main/user-input/user-input-specific'
import { ERROR_ALREADY_EXIST, ERROR_COMMON_CONFIG, ERROR_SPECIFIC_CONFIG, NO_ERROR  } from '../main/utils/constants'
import { checkDirectory, cleanDestDir } from '../main/utils/io-utils'

/**
 * This class represent the interactive command.
 * This command is available through the CLI
 */
export default class Interactive extends Command {
  // Description of the command
  static description = 'This command is used to create a new template. \
  It will ask you questions about the configuration.'

  // Usage example
  static examples = [
    '$ mobile-generator interactive',
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

  async run(): Promise<void> {
    // Check requirements
    await this.require_configuration.checkRequirements()
    // Check if it's all good
    // N.B. : some requirements can be blocking others don't
    if (this.require_configuration.isAllGood()) {
      await this.interactiveRun()
    }
  }

  async interactiveOverwriteDest(): Promise<boolean> {
    // Check if output directory already exist
    if (await checkDirectory(this.configuration)) {
      // Ask user if he wants to overwrite it
      await overwriteDestDirForm(this.configuration).then(overwrite => {
        if (overwrite) {
          // If user wants to overwrite it, we delete all contents
          cleanDestDir(this.configuration)
        } else {
          this.exit(ERROR_ALREADY_EXIST)
        }
      }, () => {
        throw new Error('Error during overwrite dest dir')
      })
    }
    return true
  }

  async interactiveRun(): Promise<void> {
    // Retrieve common config to all platform
    await commonConfigForm(this.configuration, this.require_configuration.isFlutterAvailable).then(async () =>

      // Retrieve config specific to chosen platform
      specificPlatformConfigForm(this.configuration).then(async () => {
        await this.interactiveOverwriteDest()
        // Output results
        await renderProject(this.configuration)
      },
        () => {
          this.exit(ERROR_SPECIFIC_CONFIG)
        })
      , () => {
        this.exit(ERROR_COMMON_CONFIG)
      })
    this.exit(NO_ERROR)
  }
}
