<template>
    <div class="wrapper">
        <CreateProject/>
        <ProjectsWrapper/>
    </div>
</template>

<script>
import CreateProject from './project/CreateProject';
import ProjectsWrapper from './project/ProjectsWrapper';

export default {
    name: 'Content',
    components: {
        CreateProject,
        ProjectsWrapper,
    }  
}
</script>

<style scoped>
.wrapper {
    font-size: 20px;
}
</style>