const fs = require("fs");
const filePath = "./tasks.json";

// Load existing tasks from JSON
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// Save updated tasks back to JSON
const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};

// Add a new task
const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTasks(tasks);
  console.log("Task added:", task);
};

// List all tasks with 1-based indexing for display
const listTasks = () => {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }
  tasks.forEach((item, index) => {
    console.log(`${index + 1}. ${item.task}`);
  });
};

// Remove a task by its list index (1-based index)
const removeTask = (indexToRemove) => {
  const tasks = loadTasks();

  // Convert 1-based user input (e.g., item #1) to 0-based array index
  const arrayIndex = indexToRemove - 1;

  if (arrayIndex < 0 || arrayIndex >= tasks.length || isNaN(arrayIndex)) {
    console.log("Invalid task index.");
    return;
  }

  // Filter out the element at the specified index
  const updatedTasks = tasks.filter((_, index) => index !== arrayIndex);

  saveTasks(updatedTasks);
  console.log(`Task #${indexToRemove} removed.`);
};

// Parse command line arguments
const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
  if (!argument) {
    console.log(
      "Please provide a task name. Example: node todo.js add 'Buy milk'",
    );
  } else {
    addTask(argument);
  }
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  if (!argument) {
    console.log(
      "Please provide the task number to remove. Example: node todo.js remove 1",
    );
  } else {
    removeTask(parseInt(argument, 10));
  }
} else {
  console.log("Command not recognized. Use: add, list, or remove.");
}
