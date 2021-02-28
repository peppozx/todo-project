class TaskDAL {
    constructor(db) {
        this.projectCollection = db.collection('project');
        this.taskCollection = db.collection('task');
    }

    async getProject(id) {
        const project = await this.projectCollection.find({ id }).toArray();
        return project;
    }

    async getTasks(projectId) {
        const tasks = await this.taskCollection.find({ projectId }).toArray();
        return tasks;
    }

    async createTask(taskDTO) {
        const { ops } = await this.taskCollection.insertOne(taskDTO);
        return ops[0];
    }

    async getTask(id) {
        const task = await this.taskCollection.find({ id }).toArray();
        return task;
    }

    async deleteTask(id) {
        await this.taskCollection.deleteOne({ id });
        return id;
    }

    async updateTask(id, taskInfo) {
        const { name, finished } = taskInfo;
        const updateQuery = {};
        if (name) updateQuery.name = name;
        if (finished) updateQuery.finished = finished;

        const { value: taskUpdated } = await this.taskCollection.findOneAndUpdate({ id }, {
            $set: updateQuery
        }, { returnOriginal: false });

        return taskUpdated;
    }
}

module.exports = TaskDAL;