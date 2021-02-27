<template>
    <div>
        <CreateProject/>
        <ProjectsWrapper/>
    </div>
</template>

<script>
import CreateProject from './CreateProject';
import ProjectsWrapper from './ProjectsWrapper';

export default {
    name: 'Content',
    components: {
        CreateProject,
        ProjectsWrapper,
    }  
}
</script>

<style scoped>

</style>