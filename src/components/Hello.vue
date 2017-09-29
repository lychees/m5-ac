<template>
  <div class="hello" style="font-size:50px">
    <div class="row">
      <div class="yellow ready-point col-sm-6 col-md-6 col-lg-6 col-xs-6" @click="OnColorSelect('yellow')" :dis="yellow_disabled">
        <div class="circle">{{yellow_name}}</div>
      </div>
      <div class="blue ready-point col-sm-6 col-md-6 col-lg-6 col-xs-6" @click="OnColorSelect('blue')" style="float:right" :dis="blue_disabled">
        <div class="circle">{{blue_name}}</div>
      </div>
    </div>
    <div class="row">
      <div class="red ready-point col-sm-6 col-md-6 col-lg-6 col-xs-6" @click="OnColorSelect('red')" :dis="red_disabled">
        <div class="circle">{{red_name}}</div>
      </div>
      <div class="green ready-point col-sm-6 col-md-6 col-lg-6 col-xs-6" @click="OnColorSelect('green')" style="float:right" :dis="green_disabled">
        <div class="circle">{{green_name}}</div>
      </div>
    </div>
    <div style="margin-top:20px">
      <input type="text" style="height:100px;" v-model="name">
      <button class="start-btn" v-show="readyToStart" @click="OnStart">Start</button>
    </div>
    <div v-show="name=='Matthew5'" class="admin">
      <div class="yellow" @click="OnRemove(yellow_name)">{{yellow_name}}</div>
      <div class="blue" @click="OnRemove(blue_name)">{{blue_name}}</div>
      <div class="red" @click="OnRemove(red_name)">{{red_name}}</div>
      <div class="green" @click="OnRemove(green_name)">{{green_name}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import server_url from '../../server/url'
var socket = io()

export default {
  name: 'hello',
  data() {
    return {
      name: '',
      yellow_name: '',
      blue_name: '',
      red_name: '',
      green_name: '',
    }
  },
  methods: {
    OnColorSelect: function (color) {
      var self = this
      var isDisable = self[color + '_disabled'] == 'disabled'
      if (self.ready && self.color === color) {
        self.color = ''
        self.ready = false
        socket.emit('onCancel', self.name)
      } else if (!self.ready) {
        if (self.name && !isDisable) {
          self.color = color
          self.ready = true
          socket.emit('onReady', { name: self.name, color: color })
        }
      }
    },
    OnRemove: function (userName) {
      socket.emit('onCancel', userName)
    },
    OnStart: function () {
      if (this.ready) {
        socket.emit('gotoAC')
      }
    },
    init: function (players) {
      var self = this
      // $('.ready-point').each((index, item) => {
      //   $(item).removeClass('disabled')
      // })
      self.yellow_name = ''
      self.blue_name = ''
      self.red_name = ''
      self.green_name = ''
      self.yellow_disabled = ''
      self.blue_disabled = ''
      self.red_disabled = ''
      self.green_disabled = ''
      self.readyToStart = false
      players.forEach(player => {
        // $(`.${player.color}`).addClass('disabled')
        //TODO: Check it in YDKJS, for and switch return false or return
        self[player.Color + '_name'] = player.Name
        self[player.Color + '_disabled'] = 'disabled'
      })
      //kick out by admin
      if (self.ready && self.color != '') {
        if (self[self.color + '_name'] == '') {
          self.ready = false
          self.color = ''
        }
      }
      if (players.length == 4) {
        self.readyToStart = true
      }
    }
  },
  created: function () {
    var self = this

    axios.post(server_url.getRoomData).then(resp => {
      if (Array.isArray(resp.data) && resp.data.length > 0) {
        self.init(resp.data)
      }
    }).catch(err => {
      console.error(err)
    })

    socket.on('room-update', function (players) {
      self.init(players)
    })
    socket.on('gotoAC', function () {
      self.$router.push({ path: '/chess', query: { name: self.name, color: self.color } })
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

.ready-point {
  width: 300px;
  height: 300px;
}

.circle {
  border-radius: 50%;
  border: solid 10px white;
  position: absolute;
  width: 200px;
  height: 200px;
  margin-top: 50px;
  margin-left: 34px;
}

.start-btn {
  height: 100px;
  width: 200px;
}

div[dis='disabled'] {
  opacity: 0.5;
}

.admin>div {
  display: inline-block;
  width: 500px;
}
</style>
