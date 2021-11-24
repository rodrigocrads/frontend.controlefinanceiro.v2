
import HttpClient from "./HttpClient";

class BaseApiService {
    constructor() {
        this.httpClient = new HttpClient(
            `${process.env.REACT_APP_API_BASE_URL}`
        );
    }

    httpClient;
}

export default BaseApiService;