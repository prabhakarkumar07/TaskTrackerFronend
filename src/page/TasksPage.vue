<template>
  <div class="container">
    <TaskForm @task-added="fetchTasks" />
    <TaskList :tasks="tasks" @task-updated="fetchTasks" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import TaskForm from "../components/task/TaskForm.vue";
import TaskList from "../components/task/TaskList.vue";

const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    tasks.value = response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

onMounted(fetchTasks);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
