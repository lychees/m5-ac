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
@media (max-width:970px) {
  #app {
    margin-top: 0px !important;
  }
  .ready-point {
    width: 60px !important;
    height: 60px !important;
    padding: 0px !important;
  }

  .hello .ready-point .circle {
    border-radius: 50%;
    border: solid 3px white;
    position: absolute;
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-left: 5px;
  }

  .hello {
    padding: 5px;
    font-size: 5px !important;
  }

  .hello input {
    height: 10px !important;
    width:100px;
  }
  .hello button.start-btn {
    height: 10px;
    width: 50px;
  }
}

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
