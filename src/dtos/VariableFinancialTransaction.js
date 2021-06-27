export default class VariableFinancialTransaction {
    title;
    description;
    value;
    category_id;

    constructor({ title, description, value, category_id, register_date }) {
        this.title = title
        this.description = description;
        this.value = value;
        this.category_id = category_id;
        this.register_date = register_date;
    }
}