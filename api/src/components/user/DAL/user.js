class UserDAL {
    constructor(db) {
        this.db = db;
    }
    
    async createUser(userDTO) {
        const user = await this.db.createUser(userDTO);
        return user;
    }
}

module.exports = UserDAL;