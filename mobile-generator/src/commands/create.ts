import { Command, flags } from '@oclif/command'
import * as inquirer from 'inquirer'
import { PlatformType } from '../main/enum';
import { Configuration } from '../main/configuration';
import { MobilePlatformConfiguration } from '../main/mobile_platform_configuration';
import { GlobalConfiguration } from '../main/global_configuration';

export default class Create extends Command {
  configuration = new Configuration();
  global_configuration = new GlobalConfiguration();

  static description = 'This command is used to create a new template. You need to give the targeted platform and app name'

  static examples = [
    `$ mobile-generator create`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = []

  async getCommonConfig() {
    let commonResponses: any = await inquirer.prompt([
      // Prompt for platform target
      {
        type: 'list',
        name: 'platform',
        message: 'Select targeted platform',
        choices: Object.keys(PlatformType).map(key => ({ name: key, value: (<any>PlatformType)[key] })),
      },
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
      // Prompt for app id
      {
        type: 'input',
        name: 'app_id',
        message: "What's your app id",
        validate: function validateAppId(name) {
          return name !== '';
        },
        default: function () {
          return 'com.mycompany.myapp';
        }
      }
    ])

    this.configuration.app_name = commonResponses.app_name
    this.configuration.app_id = commonResponses.app_id
    this.configuration.mobile_platform_configuration = MobilePlatformConfiguration.fromPlatformType(commonResponses.platform)

  }

  async getSpecificConfig() {
    if (this.configuration.mobile_platform_configuration.platform === PlatformType.Flutter) {
      // Flutter CLI will fill corresponding value

    } else {
      let sdk_target_version: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What's your target ${this.configuration.mobile_platform_configuration.platform} SDK version ?`,
          choices: this.global_configuration
            .getPlatformConfiguration(this.configuration.mobile_platform_configuration.platform)
            .sdk_version
            .map(version => ({ name: version.toString(), value: version })),
        }
      ])

      this.configuration.mobile_platform_configuration.sdk_target_version = sdk_target_version.value

      let sdk_min_version: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What's your min ${this.configuration.mobile_platform_configuration.platform} SDK version ?`,
          choices: this.global_configuration
            .getPlatformConfiguration(this.configuration.mobile_platform_configuration.platform)
            .sdk_version
            .filter(version => version.compare(this.configuration.mobile_platform_configuration.sdk_target_version) <= 0)
            .map(version => ({ name: version.toString(), value: version })),
        }
      ])

      this.configuration.mobile_platform_configuration.sdk_min_version = sdk_min_version.value

      let template: any = await inquirer.prompt([
        {
          type: 'list',
          name: 'value',
          message: `What kind of application template would you use ?`,
          choices: this.configuration.mobile_platform_configuration.template
            .map(template => ({ name: template.toString(), value: template })),
        }
      ])

      this.configuration.mobile_platform_configuration.template = template.value

      let internet_permission: any = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'value',
          message: `Will your application needs internet access ?`,
        }
      ])

      this.configuration.internet_permission = internet_permission.value

    }
  }


  async run() {
    const { args, flags } = this.parse(Create)

    this.getCommonConfig()

    this.getSpecificConfig()

    this.log(`Configuration ${this.configuration.toString()}`)
  }
}

