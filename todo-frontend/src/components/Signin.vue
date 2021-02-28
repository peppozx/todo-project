<template>
  <div class="login-page">
    <div class="login-page-form">
      <div class="login-page-form-title">
        <span>Sign In</span>
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
        <button v-if="!loading" @click="signin">Sign In</button>
        <div v-else class="loading">
          <PulseLoader />
        </div>
        <div class="signup" @click="signup">
          <button>Sign Up</button>
        </div>
        <div class="user-not-found" v-if="userNotFound">
          <span>User not found</span>
        </div>
        <div class="incorrect-password" v-if="incorrectPassword">
          <span>Incorrect password</span>
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
      userNotFound: false,
      incorrectPassword: false,
    };
  },
  components: {
    PulseLoader,
  },
  methods: {
    async signin() {
      try {
        this.loading = true;
        this.userNotFound = false;
        this.incorrectPassword = false;

        let response = await fetch("http://localhost:3000/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        setTimeout(async () => {
          this.loading = false;
          if (response.status == 200) {
            const { token } = await response.json();
            this.$store.commit('name', this.username);
            localStorage.setItem('token', token);
            localStorage.setItem('username', this.username);
            this.$router.push('/home');
          } else if (response.status == 404) {
            this.userNotFound = true;
          } else if (response.status == 401) {
            this.incorrectPassword = true;
          }
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },
    signup() {
      this.$router.push("/signup");
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
  box-shadow: 0px 10px 30px -10px #8ebf42;
  border-width: 0px;
  border-radius: 30px;
}

.login-page-form-title {
  margin-top: 25px;
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
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}

input:hover {
  transform: scale(1.05);
  transition: 0.6s;
}

input:focus {
  outline: none;
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