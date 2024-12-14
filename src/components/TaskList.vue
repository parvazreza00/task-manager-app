<script setup>
import { ref, computed } from "vue";
import { taskStore } from "../data/taskStore";

const newTask = ref("");
const showForm = ref(false);
const filter = ref("all");

const tasks = computed(() => taskStore.tasks);

const filteredTasks = computed(() => {
  if (filter.value === "completed") {
    return tasks.value.filter((task) => task.completed);
  }
  return tasks.value;
});

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const addTask = () => {
  taskStore.addTask(newTask.value);
  newTask.value = "";
};

const toggleCompletion = (taskId) => {
  taskStore.toggleTaskCompletion(taskId);
};

const deleteTask = (taskId) => {
  taskStore.deleteTask(taskId);
};
</script>

<template>
  <div class="task-manager">
    <h1 class="my-2 text-2xl">Task Manager</h1>

    <button @click="toggleForm">
      {{ showForm ? "Hide" : "Add New Task" }} Form
    </button>

    <div v-if="showForm" class="mt-2">
      <form @submit.prevent="addTask">
        <input class="w-2/3 py-2 p-2 border border-gray-300" type="text" v-model="newTask" placeholder="Enter a task" />
        <button type="submit">Add Task</button>
      </form>
    </div>

    <div v-if="tasks.length === 0" class="no-tasks">
      No tasks available
    </div>
    <ul v-else>
      <li
        v-for="task in filteredTasks"
        :key="task.id"
        :class="{ completed: task.completed }"
      >
        <label>
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleCompletion(task.id)"
          />
          {{ task.name }}
        </label>
        <button @click="deleteTask(task.id)" class="deleteButton">Delete</button>
      </li>
    </ul>

    <div class="space-x-5">
      <button @click="filter = 'all'">Show All</button>
      <button @click="filter = 'completed'">Show Completed</button>
    </div>
  </div>
</template>



<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.completed {
  background-color: lightgreen;
  border: 2px solid red;
}

form {
  width:500px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.no-tasks {
  margin: 5px 0px;  
  padding: 5px 0px;
  text-align: center;
  color: gray;
}

button {
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
}

.deleteButton{
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  background-color: #db5e5e;
  color: white;
  border-radius: 4px;
}

.deleteButton:hover{
    background-color: #e10b0b;
}

button:hover {
  background-color: #0056b3;
}
</style>
