import { Command, flags } from '@oclif/command'

import { Configuration } from '../main/configuration/configuration'
import { PlatformType } from '../main/configuration/enum'
import { renderProject } from '../main/mustache/mustache'
import { RequireConfiguration } from '../main/requirements/require-configuration'
import { ANDROID_FLAGS } from '../main/user-input/user-input-android'
import { COMMON_FLAGS, commonCheckFlags, commonConfigFromArgsFlags } from '../main/user-input/user-input-common'
import { IOS_FLAGS } from '../main/user-input/user-input-ios'
import { specificPlatformConfigFromFlags } from '../main/user-input/user-input-specific'
import { ERROR_ALREADY_EXIST, NO_ERROR } from '../main/utils/constants'
import { checkDirectory, cleanDestDir } from '../main/utils/io-utils'
import { isEmpty } from '../main/utils/string-utils'

/**
 * This class represent the create command.
 * This command is available through the CLI
 */
export default class Create extends Command {
  // Description of the command
  static description = 'This command is used to create a new template. You need to give the targeted platform and app name'

  // Usage example
  static examples = [
    '$ mobile-generator create android my-app com.mycompany --android_min_sdk=21 --android_target_sdk=29 --android_template=drawer --internet_permission',
    '$ mobile-generator create ios my-app com.mycompany --ios_min_sdk=21 --ios_template=drawer --internet_permission',
    '$ mobile-generator create flutter my-app com.mycompany',
  ]

  // Flags available
  static flags = {
    help: flags.help({ char: 'h' }),
    ...COMMON_FLAGS,
    ...ANDROID_FLAGS,
    ...IOS_FLAGS,
  }

  // Args needed
  static args = [
    { name: 'platform', description: 'platform to choose', options: Object.keys(PlatformType).map(platform => platform.toLowerCase()), required: true },
    { name: 'app_name', description: 'application name', required: true },
    { name: 'app_id', description: 'application id (app name will be automatically added at the end)', required: true },
  ]

  // Create new user configuration with default values
  configuration = new Configuration()

  // Create new require configuration with default values
  require_configuration = new RequireConfiguration()

  async run(): Promise<void> {
    const { args, flags } = this.parse(Create)

    // Check requirements
    await this.require_configuration.checkRequirements()
    // Check if it's all good
    // N.B. : some requirements can be blocking others don't
    if (this.require_configuration.isAllGood()) {
      if (!isEmpty(args) || !isEmpty(flags)) {
        await this.staticRun(args, flags)
      }
    }
  }

  async staticRun(args: any, flags: any): Promise<void> {
    if (commonCheckFlags(args)) {
      commonConfigFromArgsFlags(args, flags, this.configuration)
      specificPlatformConfigFromFlags(args.platform, flags, this.configuration)

      // Check if output directory already exist
      if (await checkDirectory(this.configuration)) {
        // Ask user if he wants to overwrite it
        if (flags.overwrite_dest) {
          // If user wants to overwrite it, we delete all contents
          cleanDestDir(this.configuration)
        } else {
          this.error(`Folder ${this.configuration.app_name} already exist, pass --${COMMON_FLAGS.overwrite_dest.name} flag to overwrite it`)
          this.exit(ERROR_ALREADY_EXIST)
        }
      }
      // Output results
      await renderProject(this.configuration)
      this.exit(NO_ERROR)
    }
  }
}
