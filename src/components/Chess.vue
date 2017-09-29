<template>
  <div class="chess" style="font-size:50px">
    <div v-html="chessHtml"></div>
    <div @click="onDiceClick" :class="diceColor" id="dice-ele" style="position:absolute;">{{diceNumber}}</div>
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
      coordCollection: [],
      outHomeCollection: [],
      chessHtml: '',
      name: '',
      color: '',
      diceNumber: 0,
      diceColor: '',
      flow_position_id: -1,
    }
  },
  methods: {
    initClientListener: function() {
      var self = this
      socket.on('position-update', function(resp) {
        if (resp.moveNext) {
          //make sure the true player move next
          if (self.name == resp.name) {
            self.flow_position_from = resp.position_to
            self.move(resp.chess_numbers[0])
          }
        }

        //moving animation
        var coordPosition
        if (resp.outHome) {
          coordPosition = self.outHomeCollection.find(x => x.color == resp.color)
        } else {
          coordPosition = self.coordCollection.find(x => x.id == resp.position_to)
        }
        $(`#${resp.color + '_' + resp.chess_numbers[0]}`).animate({ top: coordPosition.top, left: coordPosition.left });

        if (!resp.moveNext) {
          self.diceColor = resp.nextDiceColor
        }
      })

      socket.on('dice-update', function(resp) {
        console.log('dice-update', resp)
        this.diceNumber = resp.number
        //resp.name
      })
      socket.on('dice-update-animation', function(resp) {
        console.log('dice-update-animation', resp)
        this.diceNumber = resp.number
        //$('#dice-ele').animate({})
        //resp.nextDiceColor
        this.diceColor = resp.nextDiceColor
      })
    },
    move: function(chess_number, movingByClick = false) {
      socket.emit('onMove', {
        name: this.name,
        chess_number: chess_number,
        byClick: movingByClick,
        //use in moving flow, unused while by click
        flow_position_id: this.flow_position_id,
        diceNumber: this.diceNumber,
      })
    },

    //UI Event
    onChessClick: function(chess_number) {
      if (event.target.parent.hasClass(`${this.color}`)) {
        this.move(chess_number, true)
      }
    },
    onDiceClick: function() {
      if ($(event.target).hasClass(`${this.color}`)) {
        socket.emit('onDice', this.name)
      }
    }
  },
  created: function() {
    var self = this
    self.name = this.$route.query.name
    self.color = this.$route.query.color
    axios.post(server_url.getChessData).then(resp => {
      self.diceColor = resp.data
    }).catch(err => {
      console.error(err)
    })

    var unitLength = document.body.clientWidth / 15
    var cla = new CoordCollection(document.body.clientWidth)
    self.coordCollection = cla.Collection
    self.outHomeCollection = cla.OutHomeCollection
    for (let coord of cla.Collection) {
      self.chessHtml += `
        <div id="${coord.id}" class="${coord.color} chess-ele" style="top:${coord.top}; left:${coord.left};">
          <div class="chess-circle"></div>
        </div>`
    }
    self.chessHtml += `
        <div class="home red" style="position:absolute; top:${unitLength * 12 + 'px'}; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="red_1" class="red-d-p-1" @click="onChessClick(1)">1</div>
          <div id="red_2" class="red-d-p-2" @click="onChessClick(2)">2</div>
          <div id="red_3" class="red-d-p-3" @click="onChessClick(3)">3</div>
          <div id="red_4" class="red-d-p-4" @click="onChessClick(4)">4</div>
        </div>
        <div class="home yellow" style="position:absolute; top:0px; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="yellow_1" class="yellow-d-p-1" @click="onChessClick(1)">1</div>
          <div id="yellow_2" class="yellow-d-p-2" @click="onChessClick(2)">2</div>
          <div id="yellow_3" class="yellow-d-p-3" @click="onChessClick(3)">3</div>
          <div id="yellow_4" class="yellow-d-p-4" @click="onChessClick(4)">4</div>
        </div>
        <div class="home blue" style="position:absolute; top:0px; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="blue_1" class="blue-d-p-1" @click="onChessClick(1)">1</div>
          <div id="blue_2" class="blue-d-p-2" @click="onChessClick(2)">2</div>
          <div id="blue_3" class="blue-d-p-3" @click="onChessClick(3)">3</div>
          <div id="blue_4" class="blue-d-p-4" @click="onChessClick(4)">4</div>
        </div>
        <div class="home green" style="position:absolute; top:${unitLength * 12 + 'px'}; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
          <div id="green_1" class="green-d-p-1" @click="onChessClick(1)">1</div>
          <div id="green_2" class="green-d-p-2" @click="onChessClick(2)">2</div>
          <div id="green_3" class="green-d-p-3" @click="onChessClick(3)">3</div>
          <div id="green_4" class="green-d-p-4" @click="onChessClick(4)">4</div>
        </div>
        `
    self.$nextTick(function() {
      $('#dice-ele').css('top', unitLength * 16 + 'px')
      $('#dice-ele').css('left', unitLength * 7 + 'px')
      $('#dice-ele').css('width', unitLength + 'px')
      $('#dice-ele').css('height', unitLength + 'px')
    })
    self.initClientListener()
    //Problem:
    //when refresh, the random color changed


    // $(`.${self.color}`).removeClass('disable')
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
