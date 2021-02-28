class UserDAL {
    constructor(db) {
        this.collection = db.collection('user');
    }
    
    async createUser(userDTO) {
        const { ops } = await this.collection.insertOne(userDTO);
        return ops[0];
    }

    async findUser(username) {
        const user = await this.collection.findOne({ username });
        return [user];
    }
}

module.exports = UserDAL;