<template>
  <Header  v-if="!$route.meta.hideNavbar" />
  <div class="container-view">
      <router-view/>
 </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Header,
  },
  async created(){
    const UserIsLogin = localStorage.getItem('token');
    if(UserIsLogin === null){
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less">
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
