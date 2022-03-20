import UserService from "../services/UserService";

export default class UserController
{
    constructor() {
        this.service = new UserService();
    }

    service;

    get() {
        return this.service.get();
    }

    update(data) {
        return this.service.update(data);
    }
}