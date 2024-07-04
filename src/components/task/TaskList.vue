<template>
  <div>
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in activeTasks" :key="task._id">
        <input
          type="radio"
          @click="completeTask(task)"
          :checked="task.completed"
        />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
      </li>
    </ul>

    <h2>Completed Tasks ({{ completedTasks.length }})</h2>
    <ul>
      <li v-for="task in completedTasks" :key="task._id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import axios from "axios";

// Define props
const props = defineProps(["tasks"]);
const emit = defineEmits(["task-updated"]);

// Setup local state
const tasks = ref(props.tasks);

watchEffect(() => {
  tasks.value = props.tasks;
});

const activeTasks = computed(() =>
  tasks.value.filter((task) => !task.completed)
);
const completedTasks = computed(() =>
  tasks.value.filter((task) => task.completed)
);

const completeTask = async (task) => {
  await axios.patch(
    `http://localhost:3000/tasks/${task._id}`,
    { completed: true },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  emit("task-updated");
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  text-decoration-thickness: 2px;
  text-decoration-color: red;
  text-shadow: 1px 1px 2px #000;
  color: green;
}
li {
  list-style-type: none;
  text-align: left;
}
</style>
