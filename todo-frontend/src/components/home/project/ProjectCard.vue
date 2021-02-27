<template>
  <div class="card">
    <div class="project-header">
      <div class="name">
        <span>{{ project.name }} </span>
      </div>
      <div class="edit">
          <i class="edit fa fa-edit" style="font-size: 18px"></i>
          <i class="delete fa fa-trash"></i>
      </div>
    </div>
    <div class="project-tasks">
      <div class="tasks" v-for="task of this.project.tasks" :key="task.id">
        <div class="todo" v-if="!task.finished">
          <input type="checkbox" @click="closeTask(task.id)" />
          <label for="vehicle1">{{ task.name }}</label
          ><br />
          <div class="edit-mode">
            <i
              class="edit fa fa-edit"
              style="font-size: 18px"
              @click="editTask(task.id)"
            ></i>
            <i class="delete fa fa-trash" @click="deleteTask(task.id)"></i>
          </div>
        </div>
        <div class="done" v-if="task.finished">
          {{ task.name }}
        </div>
      </div>
    </div>
    <hr style="width: 90%" />
    <div class="create-task">
      <input v-model="taskName" />
      <button :disabled="!taskName" @click="createTask">Add</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectCard",
  props: ["project"],
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    async createTask() {
      try {
        await fetch(`http://localhost:3000/project/${this.project.id}/task`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: this.taskName,
          }),
        });
        this.$store.dispatch("loadProjects");
      } catch (err) {
        console.log(err);
      }
    },
    async closeTask(id) {
      try {
        const finished = new Date();
        await fetch(
          `http://localhost:3000/project/${this.project.id}/task/${id}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              finished,
            }),
          }
        );
        const [task] = this.project.tasks.filter((t) => t.id === id);
        task.finished = finished;
      } catch (err) {
        console.error(err);
      }
    },

    async editTask(id) {
      try {
        console.log("edit mode on" + id);
      } catch (err) {
        console.error(err);
      }
    },

    async deleteTask(id) {
      try {
        await fetch(
          `http://localhost:3000/project/${this.project.id}/task/${id}`,
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        this.project.tasks = this.project.tasks.filter((t) => t.id != id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style scoped>
.card {
  font-family: Montserrat;
  box-shadow: 0px 10px 30px -10px #8ebf42;
  display: flex;
  flex-flow: row wrap;
  background-color: snow;
  height: 300px;
  flex: 0 0 90%;
  margin-top: 30px;
  border-radius: 15px;
}
.project-header {
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  flex: 0 0 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  background-color: #8ebf42;
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
  overflow-x: hidden;
}

.tasks {
  flex: 0 0 100%;
  text-align: start;
  padding: 10px 0px 5px 5px;
}

.done {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  text-decoration: line-through;
  font-size: 13px;
}

.todo {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.todo input {
  flex: 0 0 10%;
}

.todo label {
  flex: 0 0 60%;
  font-size: 13px;
}

.todo .edit {
  flex: 0 0 10%;
  cursor: pointer;
  margin-top: 3px;
}

.edit {
    flex: 0 0 20%;
    cursor: pointer;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
}

.todo .delete {
  flex: 0 0 10%;
  cursor: pointer;
}

.edit-mode {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;
  flex: 0 0 20%;
}

.create-task {
  display: flex;
  flex-flow: row wrap;
  flex: 0 0 100%;
  justify-content: space-around;
  padding: 20px 0px 25px 0px;
}
</style>