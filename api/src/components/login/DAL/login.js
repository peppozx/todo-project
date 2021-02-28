class LoginDAL {
    constructor(db) {
        this.collection = db.collection('user');
    }

    async findUser(username) {
        const user = await this.collection.findOne({ username });
        if (user) {
            return [user];
        } else {
            return [];
        }
    }
}

module.exports = LoginDAL;