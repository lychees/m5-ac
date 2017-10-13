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
      roadCollection: [],
      outHomeCollection: [],
      chessHtml: '',
      name: '',
      color: '',
      diceNumber: 0,
      diceColor: '',
      flow_position_from: -1,
    }
  },
  methods: {
    getPoint: function(positionId, color = '') {
      if (positionId == 0) {
        return this.outHomeCollection.find(x => x.color == color)
      } else {
        return this.roadCollection.find(x => x.id == positionId)
      }
    },
    initPosition: function(players) {
      var self = this
      for (let player of players) {
        player.Positions.forEach((p, index) => {
          if (p >= 0) {
            var point = self.getPoint(p, player.Color)
            $(`#${player.Color}_${index + 1}`).css('top', point.top)
            $(`#${player.Color}_${index + 1}`).css('left', point.left)
          }
        })
      }
    },
    initClientListener: function() {
      var self = this
      socket.on('position-update', function(resp) {
        console.log('position-update', resp)
        if (resp.moveNext) {
          //make sure the true player move next
          if (self.name == resp.name) {
            console.log('selfName', self.name)
            self.flow_position_from = resp.position_to
            self.move(resp.chess_numbers[0])
          }
        }

        //moving animation
        var positionId = resp.outHome ? 0 : resp.position_to
        var point = self.getPoint(positionId, resp.color)
        $(`#${resp.color + '_' + resp.chess_numbers[0]}`).animate({ top: point.top, left: point.left });

        if (!resp.moveNext) {
          self.diceColor = resp.nextDiceColor
        }
      })

      socket.on('dice-update', function(resp) {
        console.log('dice-update', resp)
        self.diceNumber = resp.number
        //resp.name
      })
      socket.on('dice-update-animation', function(resp) {
        console.log('dice-update-animation', resp)
        self.diceNumber = resp.number
        //$('#dice-ele').animate({})
        //resp.nextDiceColor
        self.diceColor = resp.nextDiceColor
      })
    },
    move: function(chess_number, movingByClick = false) {
      socket.emit('onMove', {
        name: this.name,
        chess_number: chess_number,
        byClick: movingByClick,
        //use in moving flow, unused while by click
        flow_position_from: this.flow_position_from,
        diceNumber: this.diceNumber,
      })
    },

    //UI Event
    onChessClick: function(number) {
      var chess_number = number % 4 == 0 ? 4 : number % 4
      if ($(event.target).hasClass(`${this.color}`)) {
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
      var acData = resp.data
      if (acData.players.length == 0) {
        self.$router.push({ path: '/' })
      }
      self.diceColor = acData.diceColor
      self.initPosition(acData.players)
    }).catch(err => {
      console.error(err)
    })

    var unitLength = document.body.clientWidth / 15
    var cla = new CoordCollection(document.body.clientWidth)
    self.roadCollection = cla.RoadCollection
    self.homeCollection = cla.HomeCollection
    self.outHomeCollection = cla.OutHomeCollection
    for (let coord of cla.RoadCollection) {
      self.chessHtml += `
        <div id="${coord.id}" class="${coord.color} chess-board-ele" style="top:${coord.top}; left:${coord.left};">
          <div class="chess-board-circle"></div>
        </div>`
    }
    for (let homePoint of cla.HomeCollection) {
      self.chessHtml += `
        <div id="${homePoint.color}_${homePoint.number}" class="${homePoint.color} chess-piece" 
        style="top:${homePoint.top}; left:${homePoint.left};">${homePoint.number}</div>
        `
    }
    //home background
    self.chessHtml += `
        <div class="home red" style="position:absolute; top:${unitLength * 12 + 'px'}; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
        </div>
        <div class="home yellow" style="position:absolute; top:0px; left:0px; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
        </div>
        <div class="home blue" style="position:absolute; top:0px; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
        </div>
        <div class="home green" style="position:absolute; top:${unitLength * 12 + 'px'}; left:${unitLength * 12 + 'px'}; width:${unitLength * 3 + 'px'}; height:${unitLength * 3 + 'px'}">
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
    console.log('created finish')
  },
  mounted: function() {
    var self = this
    console.log('beforeMount')
    // @click="onChessClick(${homePoint.number})"
    console.log($('.chess-piece'))
    $('.chess-piece').each((index, piece) => {
      $(piece).on('click', function() {
        self.onChessClick(index + 1)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.chess-board-ele {
  position: absolute;
  width: calc(100% / 15);
  height: 0;
  padding-bottom: calc(100% / 15);
}

.chess-board-circle {
  border-radius: 50%;
  border: solid 3px white;
  position: absolute;
  width: calc(100% * 8 / 10);
  height: 0;
  padding-bottom: calc(100% * 8 / 11);
  margin-top: calc(100% / 10);
  margin-left: calc(100% / 10);
}

.chess-piece {
  border-radius: 50%;
  border: solid 3px white;
  width: calc(100% / 15);
  height: 0;
  padding-bottom: calc(100% / 15);
  position: absolute;
  z-index: 1000;
}



















/*.default-position div:nth-child(1)*/
</style>
