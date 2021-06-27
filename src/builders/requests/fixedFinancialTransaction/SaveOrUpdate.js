import { convertBrDateToIso } from "../../../helpers/utils";

export default class FixedFinancialTransactionBuilderRequest {
    fixedRevenueOrExpense;

    constructor(fixedRevenueOrExpense) {
        this.fixedRevenueOrExpense = fixedRevenueOrExpense;
    }

    build() {
        return {
            ...this.fixedRevenueOrExpense,
            activation_control: {
                ...this.fixedRevenueOrExpense.activation_control,
                start_date: convertBrDateToIso(this.fixedRevenueOrExpense.activation_control.start_date),
                end_date: convertBrDateToIso(this.fixedRevenueOrExpense.activation_control.end_date),
            }
        }
    }
}