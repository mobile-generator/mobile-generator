export interface ISdkVersion {
    version_major: number
    version_minor: number
}

export class SdkVersion implements ISdkVersion {
    static fromString(version: string) {
        let [version_major, version_minor] = version.split('.', 2).map(str => parseInt(str, 10))
        return new this(version_major, version_minor)
    }

    version_major: number
    version_minor: number

    constructor(version_major = 0, version_minor = 0) {
        this.version_major = version_major
        this.version_minor = version_minor
    }

    compare(other_sdk: SdkVersion) {
        if (this.version_major !== other_sdk.version_major) {
            return this.version_major > other_sdk.version_major
        } else if (this.version_minor !== other_sdk.version_minor) {
            return this.version_minor > other_sdk.version_minor
        }
        return 0
    }
    toString() {
        return this.version_major + '.' + this.version_minor
    }
}
