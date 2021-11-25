import CategoryService from "../services/CategoryService";

export default class CategoryController
{
    constructor() {
        this.service = new CategoryService();
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