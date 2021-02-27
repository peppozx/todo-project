import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        username: '',
        projects: [],
    },

    mutations: {
        name(state, name) {
            state.username = name;
        },
        projects(state, projects) {
            state.projects = projects;
        }
    },
    actions: {
        async loadProjects(context) {
            const response = await fetch('http://localhost:3000/project', {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token'),
                },
            });
            const projects = await response.json();
            context.commit('projects', projects);
        }
    }
});

export default store;