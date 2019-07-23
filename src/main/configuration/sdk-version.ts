/**
 * Interface for SDK version
 */
export interface ISdkVersion {
    version_major: number
    version_minor: number
}

/**
 * SdkVersion
 * This class is used qualify different SDK version
 * This facilitate the comparison between version
 */
export class SdkVersion implements ISdkVersion {
    /**
     * fromString
     * @param version: string
     * @summary Create SdkVersion instance from string
     */
    static fromString(version: string): SdkVersion {
        let [version_major, version_minor] = version.split('.', 2).map(str => parseInt(str, 10))
        return new this(version_major, version_minor)
    }

    version_major: number
    version_minor: number

    constructor(version_major = 0, version_minor = 0) {
        this.version_major = version_major
        this.version_minor = version_minor
    }

    /**
     * compare
     * @returns
     * value > 0 if current is newer
     * value = 0 if current is equal
     * value < 0 if current is older
     * @summary Compare two sdk version.
     */
    compare(other_sdk: SdkVersion): number {
        if (this.version_major !== other_sdk.version_major) {
            return this.version_major - other_sdk.version_major
        } else if (this.version_minor !== other_sdk.version_minor) {
            return this.version_minor - other_sdk.version_minor
        }
        // return equal value
        return 0
    }
    /**
     * toString
     * @returns class info
     * @summary Returns class information
     */
    toString(): string {
        if (this.version_minor === 0) {
            return `${this.version_major}`
        }
        return this.version_major + '.' + this.version_minor
    }
}
