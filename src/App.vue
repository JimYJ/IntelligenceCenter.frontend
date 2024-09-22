<template>
    <WiseQuestions v-if="$route.path==='/'" />
    <MainPage v-if="$route.path!='/'" />
</template>

<script>
import MainPage from './components/MainPage.vue'
import WiseQuestions from './components/WiseQuestions.vue'

export default {
    name: 'App',
    components: {
        MainPage: MainPage,
        WiseQuestions: WiseQuestions
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
