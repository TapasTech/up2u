<template>
  <div id="app" class="flex-col">
    <messages class="flex-auto"></messages>
    <choices-item :node="nodeData.choices" v-if="nodeData.choices"></choices-item>
  </div>
</template>

<script>
import {processBlock} from 'src/services/nodes';
import {Entries} from 'src/services/models';
import store from 'src/services/store';
import Messages from './Messages';
import ChoicesItem from './ChoicesItem';

Entries.get('default')
.then(entry => Entries.Blocks.fill({id: entry.id}).get())
.then(blocks => blocks.reduce((ready, block) => ready.then(() => processBlock(block)), Promise.resolve()));

export default {
  components: {
    Messages,
    ChoicesItem,
  },
  data() {
    return store;
  },
};
</script>

<style lang="less">
@import '~normalize.css';
* {
  box-sizing: border-box;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-auto {
  flex: auto;
}

body {
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  background: #eee;
}
html,
body {
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  padding: 1rem;
}
#app,
.item-response {
  max-width: 50rem;
  margin: 0 auto;
}
.item {
  display: block;
  position: relative;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #333;
}
.item-transition {
  transition: .5s;
}
.item-hide {
  visibility: hidden;
}
.item-user {
  text-align: right;
}
.item-response {
  text-align: center;
}
.item-container {
  display: inline-block;
  max-width: 90%;
  padding: .5rem 1rem;
  text-align: justify;
  background: white;
  border-radius: .2rem;
  color: #333;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  .item-user &,
  &.item-user {
    background: green;
    color: white;
  }
}
</style>
