type StoredRegex = {
    [key: string]: RegExp;
};

class RegexManager {
    private static regexps: StoredRegex = {
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        password: /^(?=.*[A-Z]).{6,}$/
    };

    static setRegex(name: string, hexCode: RegExp) {
        this.regexps[name] = hexCode;
    }

    static getRegex(name: string): RegExp {
        return this.regexps[name] || null;
    }
}

export default RegexManager;
