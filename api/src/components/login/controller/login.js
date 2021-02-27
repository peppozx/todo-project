class LoginController {
    constructor(loginService, apiResponse, handleError) {
        this.loginService = loginService;
        this.apiResponse = apiResponse;
        this.handleError = handleError;
    }

    async signIn({ body }) {
        try {
            const { username, password } = body;
            const token = await this.loginService.signIn({ username, password });
            return this.apiResponse.ok({ token });
        } catch (err) {
            return this.handleError(err);
        }
        
    }
}

module.exports = LoginController;