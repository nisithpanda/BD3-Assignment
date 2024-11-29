const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let tasks = [
  { taskId: 1, text: 'sample content', priority: 1 },
  { taskId: 2, text: 'sample content2', priority: 3 },
  { taskId: 3, text: 'sample content3', priority: 2 },
];

/***
 * Endpoint 1. Add a Task to the Task List
 */
function addTask(taskId, text, priority) {
  let task = {
    taskId,
    text,
    priority,
  };
  tasks.push(task);
}
app.get('/tasks/add', (req, res) => {
  const taskId = parseInt(req.query.taskId);
  const text = req.query.text;
  const priority = parseInt(req.query.priority);
  addTask(taskId, text, priority);
  res.json({
    tasks,
  });
});

/***
 * Endpoint 2. Read All Tasks in the Task List
 */
app.get('/tasks', (req, res) => {
  res.json({
    tasks,
  });
});

/***
 * Endpoint 3. Sort Tasks by Priority
 */
function tasksByPriority(task1, task2) {
  return task1.priority - task2.priority;
}
app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.slice();
  result.sort((a, b) => tasksByPriority(a, b));
  res.json({
    tasks: result,
  });
});

/***
 * Endpoint 4. Edit Task Priority
 */

function updatePriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
}
app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  updatePriority(taskId, priority);

  res.json({
    tasks,
  });
});

/***
 * Endpoint 5. Edit/Update Task Text
 */
function updateText(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
}
app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  updatePriority(taskId, text);

  res.json({
    tasks,
  });
});

/***
 * Endpoint 6. Delete a Task from the Task List
 */
function deleteTask(task, taskId) {
  return task.taskId !== taskId;
}
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  tasks = tasks.filter((task) => deleteTask(task, taskId));
  res.json({
    tasks,
  });
});

/***
 * Endpoint 7. Filter Tasks by Priority
 */
function filterTaskByPriority(task, priority) {
  return task.priority === priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let filteredTasks = tasks.filter((task) =>
    filterTaskByPriority(task, priority)
  );
  res.json({
    tasks: filteredTasks,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
