<template>
  <div class="task-form">
    <form @submit.prevent="addTask" class="form">
      <button type="submit" class="add-button">+</button>
      <input
        type="text"
        v-model="taskDescription"
        placeholder="Enter a new task"
        required
        on:click.enter="addTask"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const taskDescription = ref("");
const emit = defineEmits(["task-added"]);

const addTask = async () => {
  if (taskDescription.value.trim() === "") return;

  try {
    await axios.post(
      "http://localhost:3000/tasks",
      { title: taskDescription.value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    taskDescription.value = "";
    emit("task-added");
  } catch (error) {
    console.error("Error adding task:", error);
  }
};
</script>

<style scoped>
.task-form {
  display: flex;
  align-items: center;
  margin: 20px 0;
}

form {
  display: flex;
  align-items: center;
}

.add-button {
  font-size: 24px;
  padding: 0 10px;
  margin-right: 10px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
