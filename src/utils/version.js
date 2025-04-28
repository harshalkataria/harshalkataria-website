export const VERSION = {
    major: 2,
    minor: 0,
    patch: 1,
    toString() {
        return `${this.major}.${this.minor}.${this.patch}`;
    }
};

export const BUILD_DATE = new Date('2025-04-28');

export const getVersionString = () => {
    return `v${VERSION.toString()} (${BUILD_DATE.toISOString().split('T')[0]})`;
};
