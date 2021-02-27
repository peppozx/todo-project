<template>
    <div class="wrapper">
        <Navbar/>
        <Content/>    
    </div>
</template>

<script>
import Navbar from './Navbar';
import Content from './Content';

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
    methods: {
    }
}
</script>

<style scoped>
.wrapper {
    flex: 0 0 100%;
}
</style>