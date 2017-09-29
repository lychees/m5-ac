# basic project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


Planing
1.Create room and start the game
2.Draw UI
3.Socket.io send to the room
4.The props card and the weather, wall


The last one: thing about the moving animation

!!!important: You'd better do not use jquery in vue

1.need a state to confirm chess running or stop, the socket may broken, when finish step should tell server ready

2.Make sure the 4 players are all online, or it would be pause or replace by computer

3.green=>red=>yellow=>blue