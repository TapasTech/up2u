<template>
  <div id="app">
    <messages></messages>
  </div>
</template>

<script>
import Messages from 'src/components/Messages';
import store from 'src/services/store';
import {root, processNode} from 'src/services/nodes';
import {delay} from 'src/utils';

delay(2000)
.then(() => processNode(root));

export default {
  data () {
    return {
      msg: 'Hello Vue 2.0!'
    }
  },
  components: {
    Messages,
  },
};
</script>

<style lang="less">
@import '~normalize.css';
body {
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  background: #eee;
}
#app {
  padding: 1rem;
}
.item {
  display: block;
  position: relative;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #333;
}
</style>
