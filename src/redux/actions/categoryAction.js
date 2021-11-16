import CategoryController from '../../controllers/CategoryController';

import { 
    FETCH_CATEGORY,
} from '../types/categoryTypes';

export const fetchCategory = id => {
    const categoryController = new CategoryController();
    const category = categoryController.getCategorybyId(id);

    return {
        type: FETCH_CATEGORY,
        payload: category,
    }
};