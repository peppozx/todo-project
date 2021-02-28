<template>
  <div class="create">
    <div class="login-page">
      <div class="login-page-form">
        <div class="login-page-form-title">
          <span>Create a new Project</span>
        </div>
        <div class="formcontainer">
          <hr />
          <div class="container">
            <input
              type="text"
              placeholder="Project name"
              name="uname"
              required
              v-model="projectName"
            />
          </div>
          <button v-if="!loading" :disabled="!projectName" @click="createProject">
            Create Project
          </button>
          <div v-else class="loading">
            <PulseLoader />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
  name: "CreateProject",
  data() {
    return {
      projectName: "",
    };
  },
  components: {
    PulseLoader,
  },
  computed: {
    loading() {
      return this.$store.state.creatingProject;
    }
  },
  methods: {
    async createProject() {
      try {
        this.$store.dispatch('createProject', this.projectName);
        this.projectName = '';
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.create {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.login-page {
  flex: 0 0 50%;
  font-family: Montserrat;
  border-radius: 20px;
  box-shadow: 0px 10px 30px -10px #8ebf42;
}

.login-page-form {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.login-page-form-title {
  margin-top: 10px;
  flex: 0 0 100%;
  font-size: 16px;
}

.loading {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

.user-not-found {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: orange;
  font-weight: 500;
}

.incorrect-password {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: red;
  font-weight: 500;
}

input[type="text"],
input[type="password"] {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  width: 100%;
  padding: 10px 5px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  transition: 0.6s;
}

input:hover {
  transform: scale(1.05);
  transition: 0.6s;
}

button {
  background-color: #8ebf42;
  color: white;
  padding: 14px 0;
  margin: 10px 0;
  border: none;
  width: 100%;
  transition: 0.6s;
  border-radius: 20px;
  cursor: pointer;
}

h1 {
  text-align: center;
  font-size: 18;
}
button:hover {
  opacity: 0.8;
  transform: scale(1.05);
  transition: 0.6s;
}

button:disabled {
  background-color: gray;
}

.formcontainer {
  text-align: left;
  margin: 5px 20px 12px;
}
.signup {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.signup button {
  flex: 0 0 50%;
  background-color: blue;
}

.container input {
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}

input:focus {
  outline: none;
}

span.psw {
  float: right;
  padding-top: 0;
  padding-right: 15px;
}
/* Change styles for span on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
}
</style>