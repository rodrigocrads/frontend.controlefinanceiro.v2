export default class FinancialTransaction {
    title;
    description;
    value;
    category_id;
    type;

    constructor({ title, description, value, category_id, register_date, type }) {
        this.title = title
        this.description = description;
        this.value = value;
        this.category_id = category_id;
        this.register_date = register_date;
        this.type = type;
    }
}