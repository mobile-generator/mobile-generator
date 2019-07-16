const chalkPipe = require('chalk-pipe')
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
    async checkRequirements() {
        if (!await flutterIsInstalled()) {
            console.log(chalkPipe('red.bold')('Mobile Generator didn\'t found flutter executable. Perhaps it isn\'t in your PATH?'))
            console.log(chalkPipe('red.bold')('Otherwise, follow the installation guide at ') + chalkPipe('green')('https://flutter.dev/docs/get-started/install'))
            this._isFlutterAvailable = false
        } else {
            this._isFlutterAvailable = true
        }
        return
    }

    /**
     * checkRequirements
     * @returns Wether or not all blocking requirements are in their ‘non-blocking’ state
     * @summary set all requirements state
     */
    isAllGood() {
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
