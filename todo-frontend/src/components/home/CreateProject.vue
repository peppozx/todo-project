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
              placeholder="Enter Project Name"
              name="uname"
              required
              v-model="name"
            />
          </div>
          <button v-if="!loading" :disabled="!name" @click="createProject">
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
          name: '',
          loading: false,
      }
  },
  components: {
      PulseLoader,
  },
  methods: {
      async createProject() {
          try {
              this.loading = true;
              await fetch('http://localhost:3000/project', {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token'), 
                    },
                    body: JSON.stringify({ name: this.name }),
              });
            setTimeout(async () => {
                this.loading = false;
                this.$store.dispatch('loadProjects');
            }, 1500);
              
          } catch (err) {
              console.log(err);
          }
      }
  }
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
}

.login-page-form {
  border: 5px solid #f1f1f1;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.login-page-form-title {
  margin-top: 10px;
  flex: 0 0 100%;
  font-size: 25px;
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