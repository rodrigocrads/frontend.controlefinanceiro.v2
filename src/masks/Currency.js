export class Currency {
    mount(value) {
        if (!value) {
            return value;
        }

        value = value.toString();

        const hasOnlyIntValue = /(\d{3,99})$/;
        const hasOnlyOneDecimal = /(\d)\.(\d{1})$/;

        if (hasOnlyIntValue.test(value) || hasOnlyOneDecimal.test(value)) {
            value = Number.parseFloat(value).toFixed(2);
        }

        value = value.replace(/\D/g, "");

        value = value.replace(/(\d)(\d{2})$/, "$1,$2");

        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

        return value;
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