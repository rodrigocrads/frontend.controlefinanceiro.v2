import CategoryService from "../services/CategoryService";

export default class CategoryController
{
    getCategorybyId(id) {
        return CategoryService.getCategoryById(id);
    }
}