const TodoistHeader = {
  "Authorization": `Bearer ${process.env.TODOIST_API_TOKEN}`
};

let ProjectsToFilter = process.env.TODOIST_FILTER_PROJECTS.split(',');

const express = require('express'),
      axios = require('axios');
const router = express.Router();


function filterProjects(project) {
  return ProjectsToFilter.includes(project.name);
}

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    let projResponse = await axios.get(`${process.env.TODOIST_API_ENDPOINT}/projects`, {
      headers: TodoistHeader
    });

    let projects = projResponse.data;

    // Filter the project
    projects = projects.filter(filterProjects);

    // Get the tasks for the projects
    let taskResponse = await axios.get(`${process.env.TODOIST_API_ENDPOINT}/tasks`, {
      headers: TodoistHeader
    });

    let tasks = taskResponse.data;

    // Loop through each project and assign its tasks
    projects.forEach(project => {
      let projTasks = tasks.filter(task => { return project.id == task.project_id })
      project.tasks = projTasks;
    });

    // Any projects without taks should not be shown
    projects = projects.filter(p => { return p.tasks.length != 0 });

    res.send(projects);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

