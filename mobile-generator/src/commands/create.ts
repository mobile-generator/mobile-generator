import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import { GLOBAL } from '../ressource/constants'
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
          choices: GLOBAL[this.configuration.mobile_platform]['sdk_version'].map(version => ({name: version.toString(), value: version })),
        }
      ])

      this.configuration.sdk_target_version = sdk_target_version.value

      let sdk_min_version: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What's your min ${this.configuration.mobile_platform} SDK version ?`,
          choices: GLOBAL[this.configuration.mobile_platform]['sdk_version']
            .filter(version => version.compare(this.configuration.sdk_target_version) <= 0)
            .map(version => ({name: version.toString(), value: version })),
        }
      ])

      this.configuration.sdk_min_version = sdk_min_version.value

      let template: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What kind of application template would you use ?`,
          choices: GLOBAL[this.configuration.mobile_platform]['template']
            .map(template => ({name: template.toString(), value: template })),
        }
      ])

      this.configuration.template = template.value

      let internet_permission: any = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'value',
          message: `Will your application needs internet access ?`,
        }
      ])

      this.configuration.internet_permission = internet_permission.value

    } else {
      // Flutter CLI will fill corresponding value
    }

    this.log(`Configuration ${this.configuration.toSring()}`)
  }
}

