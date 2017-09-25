<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.yellow {
  background-color: #f4f42e;
}

.blue {
  background-color: #4abcf3;
}

.red {
  background-color: #f93c3c;
}

.green {
  background-color: #36dc36;
}
</style>
