<template>
    <div class="wrapper">
        <Navbar/>
        <Content/>    
    </div>
</template>

<script>
import Navbar from './Navbar';
import Content from './content/Content';

export default {
    name: 'Home',
    components: {
        Navbar,
        Content,
    },
    beforeCreate() {
        if (!localStorage.getItem('token')) {
            this.$router.push('/signin');
        }
    },
    created() {
        this.$store.dispatch('loadProjects');
    }
}
</script>

<style scoped>
.wrapper {
    flex: 0 0 100%;
}
</style>