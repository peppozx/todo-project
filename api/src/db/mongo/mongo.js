const mongo = require('mongodb');

class MongoConnect {
    contructor() {
        this.client = null;
    }

    connect() {
        const self = this;
        return new Promise((resolve, reject) => {
            mongo.connect("mongodb://todo-db:27017/todo-api", (err, db) => {
                if (err) return reject(err);
                console.log('connected successfuly to mongodb');
                self.client = db.db('todo');
                resolve(db);
            })
        })
    }

    async createUserCollection() {
        try {
            await this.client.createCollection('user');
        } catch(err) {
            console.log('Skiping user collection creation. Already exists');
        }
        this.client.collection('user').deleteMany({ });
    }

    async createProjectCollection() {
        try {
            await this.client.createCollection('project');
        } catch(err) {
            console.log('Skiping project collection creation. Already exists');
        }
        this.client.collection('project').deleteMany({ });
    }

    async createTaskCollection() {
        try {
            await this.client.createCollection('task');
        } catch(err) {
            console.log('Skiping task collection creation. Already exists');
        }
        this.client.collection('task').deleteMany({ });
    }

    getClient() {
        return this.client;
    }
}

module.exports = new MongoConnect();
