import { WARNING_FLUTTER_NOT_IN_PATH_MSG_1, WARNING_FLUTTER_NOT_IN_PATH_MSG_2 } from '../utils/constants'
import { flutterIsInstalled } from '../utils/flutter-utils'

/**
 * This class represent the requirements configuration.
 * It will contains information about requirements
 */
export class RequireConfiguration {
    // Boolean representing wether or not Flutter CLI is available (Non-blocking requirements)
    private _isFlutterAvailable: boolean

    // By default we set the values in their ‘blocking’ state
    constructor() {
        this._isFlutterAvailable = false
    }

    /**
     * checkRequirements
     * @summary set all requirements state
     */
    async checkRequirements(): Promise<boolean> {
        if (!await flutterIsInstalled()) {
            console.log(WARNING_FLUTTER_NOT_IN_PATH_MSG_1)
            console.log(WARNING_FLUTTER_NOT_IN_PATH_MSG_2)
            this._isFlutterAvailable = false
        } else {
            this._isFlutterAvailable = true
        }
        return true
    }

    /**
     * isAllGood
     * @returns Wether or not all blocking requirements are in their ‘non-blocking’ state
     * @summary set all requirements state
     */
    isAllGood(): boolean {
        return true
    }

    /**
     * isFlutterAvailable
     * @returns isFlutterAvailable state
     * @summary getter for isFlutterAvailable
     */
    get isFlutterAvailable(): boolean {
        return this._isFlutterAvailable
    }
}
