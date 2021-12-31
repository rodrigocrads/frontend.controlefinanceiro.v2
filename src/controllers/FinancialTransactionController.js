import FinancialTransactionService from "../services/FinancialTransactionService";

class FinancialTransactionController {
    constructor() {
        this.service = new FinancialTransactionService();
    }

    service;

    getById(id) {
        return this.service.getById(id);
    }

    update(id, data) {
        return this.service.update(id, data);
    }

    create(data) {
        return this.service.create(data);
    }

    delete(id) {
        return this.service.delete(id);
    }

    list(params) {
        return this.service.list(params);
    }
}

export default FinancialTransactionController;