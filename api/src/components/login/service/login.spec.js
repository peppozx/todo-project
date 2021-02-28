const LoginService = require('./login');
const { fakeUserDAL } = require('../../../db/fake');
const auth = require('../../../auth');

describe('LoginService', () => {
    let loginService;

    beforeEach(() => {
        loginService = new LoginService(fakeUserDAL, auth);
    });

    it('Should fail to login', async () => {
        const user = {
            username: 'user1',
            password: '123',
        };
        try {
            const response = await loginService.signIn(user);
            expect(1).toBe(2);
        } catch (err) {
            expect(err.type).toBe('not_found');
        }
    });

    it ('Should be able to login', async () => {
        const user = {
            username: 'user1',
            password: '123',
        };
        await fakeUserDAL.createUser(user);

        try {
            const response = await loginService.signIn(user);
            expect(response).toBeDefined();
        } catch (err) {
            expect(1).toBe(2);
        }
        

    });
})
