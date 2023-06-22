import { convertBrDateToIso } from "../../../helpers/utils";

export default class SaveOrUpdate {
    entry;

    constructor(entry) {
        this.entry = entry;
    }

    build() {
        return {
            ...this.entry,
            register_date: convertBrDateToIso(this.entry.register_date),
        }
    }
}