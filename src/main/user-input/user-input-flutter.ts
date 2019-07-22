import { Configuration } from '../configuration/configuration'

/**
 * flutterConfigFromFlags
 * @param flags flags passed to CLI
 * @param configuration user configuration
 * @summary It will set specific configuration for Flutter using flags values
 */
// tslint:disable-next-line: no-unused
export function flutterConfigFromFlags(flags: any, configuration: Configuration) {
    // For now Flutter doesn't require any flags
}

/**
 * flutterConfigForm
 * @param configuration user configuration
 * @returns It will returns a promise which resolve as true if there are no errors
 * otherwise it will reject it with the error
 * @summary It will ask for Flutter specific configuration using InquirerJS
 */
export async function flutterConfigForm() {
    /**
     * For now there are no specific question regarding Flutter
     */

    return true
}
