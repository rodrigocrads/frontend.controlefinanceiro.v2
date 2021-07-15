export class Currency {
    mount(value) {
        if (!value) {
            return value;
        }

        value = value.toString();

        return value.replace(/(\d)\.(\d{1})$/, "$1.$20")
            .replace(/\D/g, "")
            .replace(/(\d)(\d{2})$/, "$1,$2")
            .replace(/(?=(\d{3})+(\D))\B/g, ".");
    }

    unmount(value) {
        if (!value) {
            return value;
        }

        return value.toString()
                    .replace(/\D/g, "")
                    .replace(/(\d)(\d{2})$/, "$1.$2");
    }
}