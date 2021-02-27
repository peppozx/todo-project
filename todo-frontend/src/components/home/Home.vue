<template>
    <div>
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
    }    
}
</script>

<style scoped>

</style>