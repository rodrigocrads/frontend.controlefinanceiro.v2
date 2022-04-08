import UserService from "../services/UserService";

export default class UserController
{    
    constructor() {
        this.service = new UserService();
    }

    get() {
        return this.service.get();
    }

    update(data) {
        return this.service.update(data);
    }

    changePassword(data) {
        return this.service.changePassword(data);
    }
}