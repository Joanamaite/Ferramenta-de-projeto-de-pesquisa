<template>
  <v-app>
    <App-Header/>
    <router-view/>
    <App-Footer/>
  </v-app>
</template>

<script>
import AppHeader from "./components/home/homeNav.vue";
import AppFooter from "./components/home/footer.vue";
export default {
  name: 'App',
  components:{
    AppHeader,
    AppFooter
  }
};
</script>