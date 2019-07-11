import { Command, flags } from '@oclif/command'

//import { blueprintConfigForm } from '../main/user-input/user-input-blueprint'

/**
 * This class represent the create command.
 * This command is available through the CLI
 */
export default class Blueprint extends Command {
  // Description of the command
  static description = 'This command is used add or remove a Blueprint'

  // Usage example
  static examples = [
    '$ mobile-generator add mobile-generator-my-blueprint',
    '$ mobile-generator remove mobile-generator-my-blueprint',
  ]

  // Flags available
  static flags = {
    help: flags.help({ char: 'h' }),
    force: flags.boolean({ char: 'f', description: 'This will overwrite the blueprint if it already exists' })
  }

  // Args needed
  static args = [
    { name: 'operation', description: 'Add or remove a blueprint', options: ['add', 'remove'], /* required: true */ },
    { name: 'path', description: 'path to the blueprint', /* required: true */ },
  ]

  async run() {
    const { args, flags } = this.parse(Blueprint)
/* 
    if (args.operation && args.path) {
      this.log(args)
    } else {
      await blueprintConfigForm().then(() => {
        this.exit(0)
      }).catch(err => {
        this.log(err)
        this.exit(1)
      }) */
    }
  }

}
