import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'
import * as inquirer from 'inquirer'
import { SDK_VERSION } from '../ressource/constants'

export default class Create extends Command {
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

    // Prompt for platform target
    let commonResponses: any = await inquirer.prompt([
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
      {
        name: 'platform',
        message: 'Select targeted platform',
        type: 'list',
        choices: [{ name: 'Android' }, { name: 'iOS' }, { name: 'Flutter' }],
      },
      {
        type: 'number',
        name: 'app_id',
        message: "What's your app id",
        default: function () {
          return Math.floor(100000 + Math.random() * 900000);
        }
      }
    ])

    let platform: string = commonResponses.platform.toLowerCase()


    let specificResponses: any = await inquirer.prompt([
      {
        type: 'list',
        name: 'sdk_version',
        message: `What's your target ${platform} SDK version ?`,
        choices: SDK_VERSION[platform].map(version => version.toString()),
      }
    ])


    let common = JSON.stringify(commonResponses, null, 4); // (Optional) beautiful indented output.
    let specific = JSON.stringify(specificResponses, null, 4); // (Optional) beautiful indented output.
    this.log(`All common settings: ${common}`)
    this.log(`All specific settings: ${specific}`)

  }
}

