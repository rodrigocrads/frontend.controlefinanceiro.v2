import CategoryService from "../services/CategoryService";

export default class CategoryController
{
    async getCategorybyId(id) {
        return await CategoryService.getCategoryById(id);
    }
}