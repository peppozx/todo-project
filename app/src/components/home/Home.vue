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
}
</script>

<style scoped>
.wrapper {
    flex: 0 0 100%;
}
</style>