import CategoryService from "../services/CategoryService";

export default class CategoryController
{
    getById(id) {
        return CategoryService.getById(id);
    }

    update(id, data) {
        CategoryService.update(id, data);
    }

    create(data) {
        CategoryService.create(data);
    }
}