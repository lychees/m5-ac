<template>
  <div class="chess" style="font-size:50px">
    chess page...
    <!--
    1.need a state to confirm chess running or stop, the socket may broken, when finish step should tell server ready

    2.12*4+4 points without target pipe, 6*4 target pipe points
    totaly 76 points and 4*4 in home

    3.Make sure the 4 players are all online, or it would be pause or replace by computer

    4.green=>red=>yellow=>blue
    -->
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import server_url from '../../server/url'
import coord from '../lib/Coord'
var socket = io()

export default {
  name: 'chess',
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
    OnColorSelect: function(color) {
      var self = this
      var isDisable = self[color + '_disabled'] == 'disabled'
      if (self.ready && self.color === color) {
        self.color = ''
        self.ready = false
        socket.emit('onCancel', { name: self.name })
      } else if (!self.ready) {
        if (self.name && !isDisable) {
          self.color = color
          self.ready = true
          socket.emit('onReady', { name: self.name, color: color })
        }
      }
    },
    OnRemove: function(userName) {
      socket.emit('onCancel', { name: userName })
    },
    OnStart: function() {
      //How to redirect to new component
      if (this.ready) {
        console.log('to start...')
        this.$router.push({path: '/ac'})
      }
    },
    init: function(players) {
      var self = this
      // $('.container').each((index, item) => {
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
        self[player.color + '_name'] = player.name
        self[player.color + '_disabled'] = 'disabled'
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
  created: function() {
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
