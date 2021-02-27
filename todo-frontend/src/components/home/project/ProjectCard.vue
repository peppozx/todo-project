<template>
    <div class="card">
        <div class="project-header">
            <div class="name">
                <span>{{ project.name }} </span>
            </div>
            <div class="edit">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="project-tasks">
            <div class="tasks" v-for="task of this.project.tasks" :key="task.id">
                <div class="todo" v-if="!task.finished">
                    {{ task.name }}
                </div>
                <div class="done" v-if="task.finished">
                    {{ task.name }}
                </div>
                <div class="edit-task">
                    
                </div>
                <div class="delete-task">

                </div>
            </div>
        </div>
        <hr style="width: 90%"/>
        <div class="create-task">
            <input v-model="taskName" />
            <button :disabled="!taskName" @click="createTask">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: ['project'],
    data() {
        return {
            taskName: '',
        }
    },
    methods: {
        async createTask() {
            try {
                await fetch(`http://localhost:3000/project/${this.project.id}/task`, {
                    method: 'post',
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token'),
                    },
                    body: JSON.stringify({
                        name: this.taskName,
                    }),
                });
                this.$store.dispatch('loadProjects');
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.card {
    font-family: Montserrat;
    box-shadow: 1px 1px 8px 3px gray;
    display: flex;
    flex-flow: row wrap;
    background-color: snow;
    height: 300px;
    flex: 0 0 90%;
    margin-top: 30px;
}
.project-header {
    padding-top: 10px;
    padding-bottom: 10px;
    flex: 0 0 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background-color: gray;
    color: #fff;
    font-weight: 500;
}

.project-tasks {
    display: flex;
    flex-flow: row wrap;
    flex: 0 0 100%;
    justify-content: flex-start;
    height: 60%;
    overflow-y: scroll;
}

.tasks {
    flex: 0 0 100%;
    text-align: start;
    padding: 10px 0px 5px 10px;
    
}

.create-task {
    display: flex;
    flex-flow: row wrap;
    flex: 0 0 100%;
    justify-content: space-around;
    padding: 20px 0px 25px 0px;
}
</style>