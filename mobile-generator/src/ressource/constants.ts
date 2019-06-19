export class SdkVersion {
    version_major: number;
    version_minor: number;
    version_fix: number;

    constructor(version_major: number = 0, version_minor: number = 0, version_fix: number = 0) {
        this.version_major = version_major;
        this.version_minor = version_minor;
        this.version_fix = version_fix;
    }

    compare(other_sdk: SdkVersion ) {
        if (this.version_major !== other_sdk.version_major) {
            return this.version_major > other_sdk.version_major;
        }else if(this.version_minor !== other_sdk.version_minor) {
            return this.version_minor > other_sdk.version_minor;
        }else if(this.version_fix !== other_sdk.version_fix) {
            return this.version_fix > other_sdk.version_fix;
        }
        return 0;
    }
    toString() {
        return this.version_major + '.' + this.version_minor + '.' + this.version_fix
    }
}
export const SDK_VERSION = {
    android: [
        new SdkVersion(7,1,2), //API 25
        new SdkVersion(8,0,0), //API 26
        new SdkVersion(8,1,0), //API 27
        new SdkVersion(9,0,0), //API 28
        new SdkVersion(10,0,0), //API 29
    ],
    ios: [
        new SdkVersion(8,4,1),
        new SdkVersion(9,3,5),
        new SdkVersion(10,3,3),
        new SdkVersion(12,3,2),
    ],
    flutter: [
        new SdkVersion(1,0,0),
        new SdkVersion(1,2,1),
    ]
}