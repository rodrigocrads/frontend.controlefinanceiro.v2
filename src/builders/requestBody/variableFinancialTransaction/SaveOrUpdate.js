import { convertBrDateToIso } from "../../../helpers/utils";

export default class SaveOrUpdate {
    variableRevenueOrExpense;

    constructor(variableRevenueOrExpense) {
        this.variableRevenueOrExpense = variableRevenueOrExpense;
    }

    build() {
        return {
            ...this.variableRevenueOrExpense,
            register_date: convertBrDateToIso(this.variableRevenueOrExpense.register_date),
        }
    }
}