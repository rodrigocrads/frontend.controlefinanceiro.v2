import CategoryService from "../services/CategoryService";

export default class CategoryController
{
    getById(id) {
        return CategoryService.getById(id);
    }

    update(id, data) {
        return CategoryService.update(id, data);
    }

    create(data) {
        return CategoryService.create(data);
    }

    delete(id) {
        return CategoryService.delete(id);
    }

    fetchAll() {
        return CategoryService.fetchAll();
    }
}