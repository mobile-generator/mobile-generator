import * as inquirer from 'inquirer'

/**
 * This class represent a loader
 * It will display a small animation.
 */
export class Loader {
    /**
     * startWithMessage
     * @param message message to display with loader
     * @returns It return loader instance
     * @summary It create a loader and display it
     */
    static startWithMessage(message: string) {
        const loader = new this(message)
        loader.start()

        return loader
    }

    // Message to display with loader
    message: string

    // Different loading phase to display
    loader: string[]

    // Index for current phase
    index: number

    // BottomBar
    ui: any

    // Interval
    interval: any

    constructor(message: string) {
        this.message = message
        this.loader = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
        this.index = this.loader.length
        this.ui = new inquirer.ui.BottomBar({ bottomBar: this.loader[this.index % this.loader.length] + this.message })
    }

    /**
     * start
     * @summary It starts loader
     */
    start() {
        this.interval = setInterval(() => {
            this.ui.updateBottomBar(this.loader[this.index++ % this.loader.length] + this.message)
        }, 100)
    }

    /**
     * stop
     * @param msg msg to display in-place of the loader
     * @summary It stops loader
     */
    stop(msg: string) {
        if (this.interval) {
            clearInterval(this.interval)
        }

        this.ui.updateBottomBar(msg)
    }
}
