<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="signup" class="form">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <input
        v-model="passwordConfirmation"
        type="password"
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const username = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const router = useRouter();

const signup = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert("Passwords do not match");
    return;
  }
  await axios.post("http://localhost:3000/auth/signup", {
    username: username.value,
    password: password.value,
  });
  router.push("/login");
};
</script>

<style scoped>
.signup-container {
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
