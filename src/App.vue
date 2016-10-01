<template>
  <div id="app">
    <messages></messages>
  </div>
</template>

<script>
import Messages from 'src/components/Messages';
import {getNode, processNode} from 'src/services/nodes';

getNode(1).then(processNode);

export default {
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    };
  },
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
