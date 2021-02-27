<template>
  <div class="navbar">
    <div class="title">
      <span>TODO List</span>
    </div>
    <div class="user">
      <span>
        {{ this.username }}
      </span>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    username() {
      return localStorage.getItem("username");
    },
  },
  methods: {
      logout() {
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          this.$router.push('/signin');
      }
  }
};
</script>

<style scoped>
.navbar {
  flex: 0 0 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 20px 20px;
  font-family: Montserrat;
  background-color: snow;
  border: solid;
  border-width: 0px 0px 1px 0px;
  box-shadow: 1px 1px 10px 2px gray;
  margin-bottom: 20px;
  align-items: center;
}
.title {
  flex: 0 0 30%;
  font-weight: 500;
  text-align: start;
}

.user {
  color: black;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.user span {
    flex: 0 0 100%;
}

.user button {
    flex: 0 0 100%;
    background-color: black;
    color: #fff;
    border-width: 0px;
    border-radius: 10px;
    height: 30px;
    width: 80px;
    cursor: pointer;
}
</style>