<template>
  <div class="chess" style="font-size:50px" v-html="chessHtml">
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
import CoordCollection from '../lib/Coord'
var socket = io()

export default {
  name: 'chess',
  data() {
    return {
      chessHtml: ''
    }
  },
  methods: {
    OnColorSelect: function(color) {
    },
    OnRemove: function(userName) {
    },
    OnStart: function() {
    },
    init: function(players) {
    }
  },
  created: function() {
    var self = this
    // var test = 800
    var unitLength = screen.width / 15 + 'px'
    var coll = new CoordCollection(screen.width).Collection
    for (let coord of coll) {
      self.chessHtml += `
        <div id="${coord.id}" class="${coord.color} chess-ele" style="top:${coord.top}; left:${coord.left}; width:${unitLength}; height:${unitLength};">
          <div class="chess-circle"></div>
        </div>`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chess-ele {
  position: absolute;
  /*width: calc(100% / 15);
  height: 0;
  padding-bottom: calc(100% / 15);*/
}

.chess-circle {
  border-radius: 50%;
  border: solid 3px white;
  position: absolute;
  width: calc(100% * 8 / 10);
  height: 0;
  padding-bottom: calc(100% * 8 / 11);
  margin-top: calc(100% / 10);
  margin-left: calc(100% / 10);
}
</style>
