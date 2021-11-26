import VariableRevenueService from "../services/VariableRevenueService";

class VariableRevenueController {
    constructor() {
        this.service = new VariableRevenueService();
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

    list() {
        return this.service.list();
    }
}

export default VariableRevenueController;