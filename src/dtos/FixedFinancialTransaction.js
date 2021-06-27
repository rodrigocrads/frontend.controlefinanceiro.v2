import ActivationControl from "./ActivationControl";

export default class FixedFinancialTransaction {
    title;
    description;
    value;
    category_id;
    activation_control;

    constructor({ title, description, value, category_id, activation_control }) {
        this.title = title
        this.description = description;
        this.value = value;
        this.category_id = category_id;

        this.activation_control = new ActivationControl({ ...activation_control });
    }
}