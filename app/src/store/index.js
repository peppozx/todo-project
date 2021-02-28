import Vue from 'vue';
import Vuex from 'vuex';

import router from '../router';
import endSession from '../services/logout';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: '',
        loadingProjects: false,
        creatingProject: false,
        loadingTasks: false,
        projects: [],
    },

    mutations: {
        name(state, name) {
            state.username = name;
        },
        projects(state, projects) {
            state.projects = projects;
        },
        loadingProjects(state, is) {
            state.loadingProjects = is;
        },
        loadingTasks(state, is) {
            state.loadingTasks = is;
        },
        setTasks(state, projectId, tasks) {
            console.log(state);
            console.log(projectId);
            console.log(tasks);
        },
        addProject(state, project) {
            state.projects.push(project);
        },
        removeProject(state, id) {
            state.projects = state.projects.filter(p => p.id != id);
        },
        creatingProject(state, is) {
            state.creatingProject = is;
        },
        addTask(state, { projectId, task }) {
            state.projects = state.projects.map(p => {
                if (p.id === projectId) {
                    p.tasks.push(task);
                }
                return p;
            });
        }
    },
    actions: {
        async createProject(context, projectName) {
            context.commit('creatingProject', true);
            const response = await fetch("http://localhost:3000/project", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ name: projectName }),
            });

            if (response.status == 401 || response.status == 400) return endSession(router);

            const project = await response.json();
            project.tasks = [];

            setTimeout(() => {
                context.commit('creatingProject', false);
                context.commit("addProject", project);
            }, 1500);
        },
        async editProjectName(_, { name, id }) {
            const response = await fetch(`http://localhost:3000/project/${id}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: name,
                }),
            });
            if (response.status == 401 || response.status == 400) return endSession(router);
        },
        async deleteProject(context, projectId) {
            const response = await fetch(`http://localhost:3000/project/${projectId}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.status == 401 || response.status == 400) return endSession(router);

            context.commit('removeProject', projectId);
        },
        async createTask(context, { taskName, projectId }) {
            const response = await fetch(`http://localhost:3000/project/${projectId}/task`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: taskName,
                }),
            });

            if (response.status == 401 || response.status == 400) return endSession(router);

            const task = await response.json();
            context.commit("addTask", { projectId, task });
        },
        async deleteTask(_, { projectId, taskId }) {
            const response = await fetch(
                `http://localhost:3000/project/${projectId}/task/${taskId}`,
                {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            if (response.status == 401 || response.status == 400) return endSession(router);
        },
        async closeTask(_, { projectId, taskId, finished }) {
            const response = await fetch(
                `http://localhost:3000/project/${projectId}/task/${taskId}`,
                {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        finished,
                    }),
                }
            );

            if (response.status == 401 || response.status == 400) return endSession(router);
        },
        async editTaskName(_, { projectId, taskId, taskName }) {
            const response = await fetch(`http://localhost:3000/project/${projectId}/task/${taskId}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: taskName,
                }),
            });

            if (response.status == 401 || response.status == 400) return endSession(router);
        },
        async loadProjects(context) {
            context.commit('loadingProjects', true);
            const response = await fetch('http://localhost:3000/project', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token'),
                },
            });

            if (response.status == 401 || response.status == 400) return endSession(router);

            const projects = await response.json();
            context.commit('projects', projects);

            // This is just for visual effects purposes
            setTimeout(() => {
                context.commit('loadingProjects', false);
                context.commit('loadingTasks', true);
                setTimeout(() => {
                    context.commit('loadingTasks', false);
                }, 1000);
            }, 1500);
        },

        async loadTasks(context, projectId) {
            const response = await fetch(`http://localhost:3000/project/${projectId}/task`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token'),
                },
            });

            if (response.status == 401 || response.status == 400) return endSession(router);

            const tasks = await response.json();
            context.commit('setTasks', projectId, tasks);
        }
    }
});

export default store;