<template>
  <div id="app" class="app">
    <nav>
      <router-link to="/">Task Tracker</router-link> |
      <router-link to="/login" v-if="!isAuthenticated">Login</router-link>
      <router-link to="/signup" v-if="!isAuthenticated">Signup</router-link>
      <router-link to="/tasks" v-if="isAuthenticated">Tasks</router-link>
      <button @click="logout" v-if="isAuthenticated">Logout</button>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

const logout = () => {
  store.commit("clearToken"); // Clear the token from the store
  router.push("/login");
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 15px;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

button {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
