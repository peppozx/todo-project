const UserService = require('./user');
const { fakeUserDAL } = require('../../../db/fake');

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService(fakeUserDAL);
    });

    it('Should create user', async () => {
        const user = {
            username: 'user1',
            password: '123'
        };

        try {
            const response = await userService.createUser(user);
            expect(response.username).toBe(user.username);
        } catch(err) {
            expect(1).toBe(2);
        }

    })
})
