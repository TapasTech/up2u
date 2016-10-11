<template>
  <div id="app">
    <messages></messages>
  </div>
</template>

<script>
import Messages from './Messages';
import {addNode, getNode, processNode} from 'src/services/nodes';
import {Entries} from 'src/services/models';

Entries.get('default')
.then(entry => Entries.Blocks.fill({id: entry.id}).get())
.then(blocks => {
  console.log(blocks);
});

export default {
  components: {
    Messages,
  },
};
</script>

<style lang="less">
@import '~normalize.css';
* {
  box-sizing: border-box;
}
body {
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  background: #eee;
}
#app {
  width: 100%;
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
