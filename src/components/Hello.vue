<template>
  <div class="hello">
    <div>
      <div class="yellow circle"></div>
      <div class="blue circle"></div>
      <div class="red circle"></div>
      <div class="green circle"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import server_url from '../../server/url'
import socket from 'socket.io'

export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
    testCrossDomain: function() {
      // function jCallback(result) {
      //     console.log(result)
      //     console.log('jCallback')
      // }

      var self = this;
      $.ajax({
        // url: 'https://api.douban.com/v2/movie/in_theaters',
        url: 'https://m.zhibo8.cc/json/hot/24hours.htm',
        //wrong way by zhibo8 site
        // url: 'https://www.zhibo8.cc/zuqiu/json/2017-07-20.htm', no
        // url: 'https://news.zhibo8.cc/zuqiu/json/2017-07-20.htm', no
        // url: 'https://soccer.hupu.com/home/latest-news?league=%E8%A5%BF%E7%94%B2&page=1', no
        dataType: "jsonp",
        jsonp: "callback",
        // jsonpCallback: 'jCallback',
        success: function(data) {
          console.log(data)
        },
        error: function(err, res) {
          console.log('error')
        }
      })

      // $.getJSON('https://news.zhibo8.cc/zuqiu/2017-08-13/599012840c5c0.htm?callback=?', function (res) {
      //     console.log(res)
      // })
    }
  },
  created: function() {
    axios.post(server_url.getRoomData).then(resp => {
      console.log(resp)
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.circle {
  border-radius: 50%;
}

.yellow {
  position: absolute;
  float: left;
  color: yellow;
}

.blue {
  position: absolute;
  float: right;
  color: blue;
}

.red {
  position: absolute;
  float: left;
  color: red;
}

.green {
  position: absolute;
  float: right;
  color: green;
}
</style>
