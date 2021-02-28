<template>
    <div class="wrapper" v-if="!loadingProjects">
        <div class="item" v-for="project in projects" :key="project.id">
            <ProjectCard v-bind:project="project" />
        </div>
    </div>
    <div class="wrapper" v-else>
        <PulseLoader/>
    </div>
</template>

<script>
import ProjectCard from '../project/ProjectCard';
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
    name: 'ProjectsWrapper',
    components: {
        ProjectCard,
        PulseLoader,
    },
    computed: {
        projects() {
            return this.$store.state.projects;
        },
        loadingProjects() {
            return this.$store.state.loadingProjects;
        }
    },
    created() {
        this.$store.dispatch('loadProjects');
    }
}
</script>

<style scoped>
.wrapper {
    margin-top: 70px;
    display: flex;
    flex-flow: row wrap;
    flex: 0 0 80%;
    justify-content: space-around;
}
.item {
    flex: 0 0 50%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}
</style>