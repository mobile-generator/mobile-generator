import sanitize from 'sanitize-filename'
import * as stripAnsi from 'strip-ansi'

/**
 * isEmpty
 * @param obj any object
 * @summary Return true if the object is empty or full of undefined values.
 * Otherwise it returns false
 */
export function isEmpty(obj: any) {
    for (const val of Object.values(obj)) {
      if (val) {
        return false
      }
    }
    return true
  }

/**
 * cleanString
 * @param str folder name
 * @summary Create folder safe name
 */
export function cleanString(str: string) {
    return sanitize(str.toLowerCase())
}

/**
 * stringToPackageNameFormat
 * @param str application name
 * @summary
 * Reformat application name string to be compliant with Android Developers rule
 * Source: https://developer.android.com/studio/build/application-id
 */
export function stringToPackageNameFormat(str: string) {
    return cleanString(str).replace(/[-_?!]/g, '_')
}

/**
 * validatePackageName
 * @param str string which is supposed to be android package name
 * @returns will return a boolean value which indicates
 * wether or not the name is a valid package name
 * @summary This will validate package name
 */
export function validatePackageName(str: string) {
    // Remove trailing colors
    str = stripAnsi.default(str)

    // Go over there for more explanation: https://stackoverflow.com/a/39331217
    const res = /(?!^abstract$|^abstract\..*|.*\.abstract\..*|.*\.abstract$|^assert$|^assert\..*|.*\.assert\..*|.*\.assert$|^boolean$|^boolean\..*|.*\.boolean\..*|.*\.boolean$|^break$|^break\..*|.*\.break\..*|.*\.break$|^byte$|^byte\..*|.*\.byte\..*|.*\.byte$|^case$|^case\..*|.*\.case\..*|.*\.case$|^catch$|^catch\..*|.*\.catch\..*|.*\.catch$|^char$|^char\..*|.*\.char\..*|.*\.char$|^class$|^class\..*|.*\.class\..*|.*\.class$|^const$|^const\..*|.*\.const\..*|.*\.const$|^continue$|^continue\..*|.*\.continue\..*|.*\.continue$|^default$|^default\..*|.*\.default\..*|.*\.default$|^do$|^do\..*|.*\.do\..*|.*\.do$|^double$|^double\..*|.*\.double\..*|.*\.double$|^else$|^else\..*|.*\.else\..*|.*\.else$|^enum$|^enum\..*|.*\.enum\..*|.*\.enum$|^extends$|^extends\..*|.*\.extends\..*|.*\.extends$|^final$|^final\..*|.*\.final\..*|.*\.final$|^finally$|^finally\..*|.*\.finally\..*|.*\.finally$|^float$|^float\..*|.*\.float\..*|.*\.float$|^for$|^for\..*|.*\.for\..*|.*\.for$|^goto$|^goto\..*|.*\.goto\..*|.*\.goto$|^if$|^if\..*|.*\.if\..*|.*\.if$|^implements$|^implements\..*|.*\.implements\..*|.*\.implements$|^import$|^import\..*|.*\.import\..*|.*\.import$|^instanceof$|^instanceof\..*|.*\.instanceof\..*|.*\.instanceof$|^int$|^int\..*|.*\.int\..*|.*\.int$|^interface$|^interface\..*|.*\.interface\..*|.*\.interface$|^long$|^long\..*|.*\.long\..*|.*\.long$|^native$|^native\..*|.*\.native\..*|.*\.native$|^new$|^new\..*|.*\.new\..*|.*\.new$|^package$|^package\..*|.*\.package\..*|.*\.package$|^private$|^private\..*|.*\.private\..*|.*\.private$|^protected$|^protected\..*|.*\.protected\..*|.*\.protected$|^public$|^public\..*|.*\.public\..*|.*\.public$|^return$|^return\..*|.*\.return\..*|.*\.return$|^short$|^short\..*|.*\.short\..*|.*\.short$|^static$|^static\..*|.*\.static\..*|.*\.static$|^strictfp$|^strictfp\..*|.*\.strictfp\..*|.*\.strictfp$|^super$|^super\..*|.*\.super\..*|.*\.super$|^switch$|^switch\..*|.*\.switch\..*|.*\.switch$|^synchronized$|^synchronized\..*|.*\.synchronized\..*|.*\.synchronized$|^this$|^this\..*|.*\.this\..*|.*\.this$|^throw$|^throw\..*|.*\.throw\..*|.*\.throw$|^throws$|^throws\..*|.*\.throws\..*|.*\.throws$|^transient$|^transient\..*|.*\.transient\..*|.*\.transient$|^try$|^try\..*|.*\.try\..*|.*\.try$|^void$|^void\..*|.*\.void\..*|.*\.void$|^volatile$|^volatile\..*|.*\.volatile\..*|.*\.volatile$|^while$|^while\..*|.*\.while\..*|.*\.while$)(^(?:[a-z_]+(?:\d*[a-zA-Z_]*)*)(?:\.[a-z_]+(?:\d*[a-zA-Z_]*)*)*$)/g.test(str)
    if (res) {
        return true
    } else {
        return 'Invalid input'
    }
}
