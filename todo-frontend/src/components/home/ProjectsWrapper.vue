<template>
    <div class="wrapper">
        <div v-for="project in projects" :key="project.id">
            {{ project.name }}
            </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectsWrapper',
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
    flex: 0 0 100%;
    justify-content: center;
}
</style>