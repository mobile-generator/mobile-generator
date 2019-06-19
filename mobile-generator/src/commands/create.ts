import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import { SDK_VERSION, ADVISED_MIN_ANDROID, ADVISED_TARGET_ANDROID } from '../ressource/constants'
import { PlatformType } from '../ressource/enum';
import { Configuration } from '../ressource/ configuration';

export default class Create extends Command {
  configuration = new Configuration();

  static description = 'This command is used to create a new template. You need to give the targeted platform and app name'

  static examples = [
    `$ mobile-generator create`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []



  async run() {
    const { args, flags } = this.parse(Create)

    let commonResponses: any = await inquirer.prompt([
      // Prompt for app name
      {
        type: 'input',
        name: 'app_name',
        message: "What's your app name",
        validate: function validateAppName(name) {
          return name !== '';
        },
        default: function () {
          return 'my-app';
        }
      },
      // Prompt for platform target
      {
        type: 'list',
        name: 'platform',
        message: 'Select targeted platform',
        choices: Object.keys(PlatformType).map(key => ({ name: key })),
      },
      // Prompt for app id
      {
        type: 'number',
        name: 'app_id',
        message: "What's your app id",
        default: function () {
          return Math.floor(100000 + Math.random() * 900000);
        }
      }
    ])

    this.configuration.app_name = commonResponses.app_name
    this.configuration.app_id = commonResponses.app_id
    this.configuration.mobile_platform = commonResponses.platform

    if (this.configuration.mobile_platform !== 'flutter') {

      let sdk_target_version: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What's your target ${this.configuration.mobile_platform} SDK version ?`,
          choices: SDK_VERSION[this.configuration.mobile_platform].map(version => ({name: version.toString(), value: version })),
        }
      ])

      this.configuration.sdk_target_version = sdk_target_version.value

      let sdk_min_version: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What's your min ${this.configuration.mobile_platform} SDK version ?`,
          choices: SDK_VERSION[this.configuration.mobile_platform]
            .filter(version => version.compare(this.configuration.sdk_target_version) <= 0)
            .map(version => ({name: version.toString(), value: version })),
        }
      ])

      this.configuration.sdk_min_version = sdk_min_version.value
    } else {
      // Flutter CLI will fill corresponding value

      this.configuration.sdk_min_version = ADVISED_MIN_ANDROID
      this.configuration.sdk_target_version = ADVISED_TARGET_ANDROID
    }

    this.log(`Configuration ${this.configuration.toSring()}`)
  }
}

