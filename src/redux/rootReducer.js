import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { categoryReducer } from './reducers/categoryReducer';
import { entryReducer } from './reducers/entryReducer';
import { sidebarReducer } from './reducers/sidebarReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
    form: formReducer,
    category: categoryReducer,
    entry: entryReducer,
    sidebar: sidebarReducer,
    user: userReducer,
    toastr: toastrReducer,
});

export default rootReducer;