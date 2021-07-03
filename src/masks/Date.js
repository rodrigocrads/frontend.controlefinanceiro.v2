export class Date {
    mask(value) {
        if (!value) {
            return value;
        }

        return this.applyReplace(value);
    }

    unmask(value) {
        if (!value) {
            return value;
        }

        return this.applyReplace(value);
    }

    applyReplace(date) {
        return date.replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(.)(.{6})$/, "$1/$2")
            .replace(/(.)(.{4})$/, "$1/$2");
    }
}