class ProjectDAL {
    constructor(db) {
        this.projectCollection = db.collection('project');
        this.taskCollection = db.collection('task');
    }

    async createProject(projectDTO) {
        const { ops } = await this.projectCollection.insertOne(projectDTO);
        return ops[0];
    }

    async deleteProject(id) {
        await this.projectCollection.deleteOne({ id });
        return id;
    }

    async getProject(id) {
        const project = await this.projectCollection.find({ id }).toArray();
        return project;
    }

    async updateProject(id, name) {
        const { value: projectUpdated } = await this.projectCollection.findOneAndUpdate({ id }, {
            $set: {
                name,
            }
        }, { returnOriginal: false });
        return projectUpdated;
    }

    async getProjects() {
        const projects = await this.projectCollection.find({}).toArray();
        return projects;
    }

    async getTasks(projectId) {
        const tasks = this.taskCollection.find({ projectId }).toArray();
        return tasks;
    }
}

module.exports = ProjectDAL;