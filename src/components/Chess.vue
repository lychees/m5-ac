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
    initPosition: function(unitLength) {
    }
  },
  created: function() {
    var self = this
    var unitLength = document.body.clientWidth / 15
    var cla = new CoordCollection(document.body.clientWidth)
    for (let coord of cla.Collection) {
      self.chessHtml += `
        <div id="${coord.id}" class="${coord.color} chess-ele" style="top:${coord.top}; left:${coord.left};">
          <div class="chess-circle"></div>
        </div>`
    }
    self.chessHtml += `
        <div class="home red" style="position:absolute; top:${unitLength * 12 + 'px'}; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="red_1" class="red-d-p-1">1</div>
          <div id="red_2" class="red-d-p-2">2</div>
          <div id="red_3" class="red-d-p-3">3</div>
          <div id="red_4" class="red-d-p-4">4</div>
        </div>
        <div class="home yellow" style="position:absolute; top:0px; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="yellow_1" class="yellow-d-p-1">1</div>
          <div id="yellow_2" class="yellow-d-p-2">2</div>
          <div id="yellow_3" class="yellow-d-p-3">3</div>
          <div id="yellow_4" class="yellow-d-p-4">4</div>
        </div>
        <div class="home blue" style="position:absolute; top:0px; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="blue_1" class="blue-d-p-1">1</div>
          <div id="blue_2" class="blue-d-p-2">2</div>
          <div id="blue_3" class="blue-d-p-3">3</div>
          <div id="blue_4" class="blue-d-p-4">4</div>
        </div>
        <div class="home green" style="position:absolute; top:${unitLength * 12 + 'px'}; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="green_1" class="green-d-p-1">1</div>
          <div id="green_2" class="green-d-p-2">2</div>
          <div id="green_3" class="green-d-p-3">3</div>
          <div id="green_4" class="green-d-p-4">4</div>
        </div>`

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chess-ele {
  position: absolute;
  width: calc(100% / 15);
  height: 0;
  padding-bottom: calc(100% / 15);
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

.home>div {
  border-radius: 50%;
  border: solid 3px white;
  width: calc(100% / 3);
  height: calc(100% / 3);
  position: absolute;
}

/*.default-position div:nth-child(1)*/
.red-d-p-1,
.yellow-d-p-1,
.blue-d-p-1,
.green-d-p-1 {
  top: calc(100% / 12);
  left: calc(100% / 12);
}

.red-d-p-2,
.yellow-d-p-2,
.blue-d-p-2,
.green-d-p-2 {
  top: calc(100% / 12);
  right: calc(100% / 12);
}

.red-d-p-3,
.yellow-d-p-3,
.blue-d-p-3,
.green-d-p-3 {
  top: calc(100% * 7 / 12);
  left: calc(100% / 12);
}

.red-d-p-4,
.yellow-d-p-4,
.blue-d-p-4,
.green-d-p-4 {
  top: calc(100% * 7 / 12);
  right: calc(100% / 12);
}
</style>
