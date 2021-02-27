<template>
  <div class="login-page">
    <div class="login-page-form">
      <div class="login-page-form-title">
        <span>Sign Up</span>
      </div>
      <div class="formcontainer">
        <hr />
        <div class="container">
          <label for="uname">Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            v-model="username"
          />
          <label for="psw">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            v-model="password"
          />
        </div>
        <button v-if="!loading" @click="signup">Sign Up</button>
        <div v-else class="loading">
          <PulseLoader />
        </div>
        <div v-if="userAlreadyExists" class="user-exists">
          <span>User already exists</span>
        </div>
        <div v-if="success" class="success">
          <span>User created successfully!</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      userAlreadyExists: false,
      success: false,
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    async signup() {
      if (this.username && this.password) {
        this.userAlreadyExists = false;
        this.success = false;
        this.loading = true;

        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        const self = this;
        setTimeout(() => {
          self.loading = false;
          if (response.status === 400) {
            this.userAlreadyExists = true;
          } else if (response.status === 200) {
            this.success = true;
          }
          setTimeout(() => {
              self.$router.push('/signin');
          }, 1000);
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  flex: 0 0 70%;
  margin-top: 100px;
  font-family: Montserrat;
}

.login-page-form {
  border: 5px solid #f1f1f1;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

.login-page-form-title {
  margin-top: 25px;
  flex: 0 0 100%;
  font-size: 25px;
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

.user-exists {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    color: red;
    font-weight: 500;
}

.success {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    color: green;
    font-weight: 500;
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
.formcontainer {
  text-align: left;
  margin: 24px 50px 12px;
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

.loading {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
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