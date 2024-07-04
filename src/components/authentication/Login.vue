<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="form">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const store = useStore();
const router = useRouter();

const login = async () => {
  try {
    await store.dispatch("login", {
      username: username.value,
      password: password.value,
    });
    router.push("/tasks");
  } catch (error) {
    console.error("Login error:", error);
  }
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
  height: 400px;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
  background-color: aqua;
  border-radius: 15px;
}
input {
  border: none;
  border-radius: 2px;
  height: 30px;
}
button {
  background-color: green;
  color: white;
}
</style>
