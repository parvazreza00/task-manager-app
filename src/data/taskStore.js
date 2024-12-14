import { reactive } from "vue";

export const taskStore = reactive({
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],

  addTask(name) {
    if (name.trim().length >= 3) {
      this.tasks.push({
        id: Date.now(),
        name,
        completed: false,
      });
      this.saveToLocalStorage();
    } else {
      alert("Task name must have at least 3 characters.");
    }
  },

  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      this.saveToLocalStorage();
    }
  },

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveToLocalStorage();
  },

  saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  },
});
