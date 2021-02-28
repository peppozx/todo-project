const AppError = require("../../../shared/AppError/AppError");
const APP_ERROR_TYPE = require("../../../shared/AppError/APP_ERROR_TYPE");

class LoginService {
    constructor(loginDAL, authService) {
        this.loginDAL = loginDAL;
        this.authService = authService;
    }
    
    async signIn({ username, password }) {
        const [user] = await this.loginDAL.findUser(username);
        
        if (!user) {
            throw new AppError({
                type: APP_ERROR_TYPE.NOT_FOUND,
                message: 'User not found',
            });
        };

        if (user.password != password) {
            throw new AppError({
                type: APP_ERROR_TYPE.UNAUTHORIZED,
                message: 'Invalid password for user',
            });
        }
        
        const token = this.authService.createToken(user);
        return token;
    }
}

module.exports = LoginService;