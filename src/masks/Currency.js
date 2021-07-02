export class Currency {
    mask(value) {
        if (!value) return value;

        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

        return value;
    }

    unmask(value) {
        if (!value) return value;

        value = value.replace(/\D/g, "");
        value = value.replace(/(\d)(\d{2})$/, "$1.$2");

        return value;
    }
}