<template>
  <div class="card">
    <div class="project-header">
      <div class="name">
        <input
          ref="projectNameInput.focus();"
          @keypress="editProjectName"
          :disabled="!projectEditMode"
          v-model="project.name"
          :class="{ 'edit-mode': projectEditMode }"
        />
      </div>
      <div class="edit">
        <i
          @click="activateEditMode"
          class="edit fa fa-edit"
          style="font-size: 18px"
        ></i>
        <i class="delete fa fa-trash" style="font-size: 18px" @click="deleteProject"></i>
      </div>
    </div>
    <div class="project-tasks">
      <div class="tasks" v-for="task of this.project.tasks" :key="task.id">
        <div class="todo">
          <input
            :disabled="task.finished"
            type="checkbox"
            @click="closeTask(task.id)"
          />
          <div class="tooltip" :class="{ 'task-finished': task.finished }">
            <span>{{ task.name }}</span>
            <span v-if="task.finished" class="tooltiptext">Finished {{ task.finished }}</span>
          </div>
          <br />
          <div class="edit-mode">
            <i
              v-if="!task.finished"
              class="edit fa fa-edit"
              style="font-size: 18px"
              @click="editTask(task.id)"
            ></i>
            <i
              v-if="!task.finished"
              class="delete fa fa-trash"
              style="font-size: 18px"
              @click="deleteTask(task.id)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <hr style="width: 90%" />
    <div class="create-task">
      <input v-model="taskName" placeholder="Task name" />
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
      projectEditMode: false,
    };
  },
  methods: {
    async editProjectName(e) {
      if (e.keyCode === 13) {
        try {
          await fetch(`http://localhost:3000/project/${this.project.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              name: this.project.name,
            }),
          });
          this.projectEditMode = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async deleteProject() {
      try {
        await fetch(`http://localhost:3000/project/${this.project.id}`, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        this.$store.dispatch("loadProjects");
      } catch (err) {
        console.log(err);
      }
    },
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

    activateEditMode() {
      this.projectEditMode = !this.projectEditMode;
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
  transition: 0.7s;
  animation: transitionOpacity 0.7s;
  max-width: 300px;
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
  padding: 10px 0px 0px 0px;
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
  justify-content: space-between;
  transition: 0.6s;
  animation: transitionOpacity 1s;
}

.todo input {
  flex: 0 0 7%;
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
  align-items: center;
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

.create-task input {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  background-color: transparent;
}

.create-task button {
  background-color: #8ebf42;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  font-family: Montserrat;
  border-width: 0px;
  width: 60px;
  cursor: pointer;
  transition: 0.6s;
}

.create-task button:hover {
  transition: 0.6s;
  transform: scale(1.05);
}

.task-finished {
  text-decoration: line-through;
}

.project-tasks::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px #8ebf42;
  border-radius: 10px;
  background-color: #f5f5f5;
}

.project-tasks::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

.project-tasks::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px #8ebf42;
  background-color: #8ebf42;
}

.name input {
  background-color: transparent;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-color: #fff;
  color: #fff;
  font-family: Montserrat;
  font-weight: 500;
}

input:focus {
  outline: none;
}

.edit-mode {
  border-bottom-width: 1px !important;
  flex: 0 0 20%;
}

.tooltip {
  flex: 0 0 60%;
  position: relative;
  display: inline-block;
  font-size: 13px;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 999999999999999;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  font-size: 10px;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
  z-index: 999999999999
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  z-index: 999999999
}

@keyframes transitionOpacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}


</style>