<template>
    <div class="wrapper">
        <div class="item" v-for="project in projects" :key="project.id">
            <ProjectCard v-bind:project="project" />
        </div>
    </div>
</template>

<script>
import ProjectCard from '../project/ProjectCard';

export default {
    name: 'ProjectsWrapper',
    components: {
        ProjectCard,
    },
    computed: {
        projects() {
            return this.$store.state.projects;
        }
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