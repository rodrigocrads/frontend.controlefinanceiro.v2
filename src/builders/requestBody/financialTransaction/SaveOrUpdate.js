import { convertBrDateToIso } from "../../../helpers/utils";

export default class SaveOrUpdate {
    financialTransaction;

    constructor(financialTransaction) {
        this.financialTransaction = financialTransaction;
    }

    build() {
        return {
            ...this.financialTransaction,
            register_date: convertBrDateToIso(this.financialTransaction.register_date),
        }
    }
}