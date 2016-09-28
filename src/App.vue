<template>
  <div id="app">
    <messages></messages>
  </div>
</template>

<script>
import Messages from 'src/components/Messages';
import store from 'src/services/store';
import {root, getNext} from 'src/services/nodes';

setTimeout(() => {
  store.items.push(root);
  getNext(root).then(node => store.items.push(node));
}, 2000);
console.log(store);

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
body {
  font-family: Helvetica, sans-serif;
  font-size: 14px;
}
#app {
  padding: 1rem;
}
.item {
  display: block;
  position: relative;
  text-align: left;
  @arrow-width: .8rem;
  @arrow-height: .4rem;
  @arrow-stroke: black;
  @arrow-fill: white;
  .item-arrow {
    &, & > i {
      border-top: @arrow-height solid transparent;
      border-bottom: @arrow-height solid transparent;
      border-right: @arrow-width solid;
      border-left: 0;
    }
    position: absolute;
    top: 50%;
    transform: translate(-100%,-50%);
    border-right-color: @arrow-stroke;
    & > i {
      position: absolute;
      left: 2px;
      top: -@arrow-height;
      border-right-color: @arrow-fill;
    }
  }
  &-user {
    text-align: right;
    .item-arrow {
      &, & > i {
        border-right: 0;
        border-left: @arrow-width solid;
      }
      right: 0;
      transform: translate(100%,-50%);
      border-left-color: @arrow-stroke;
      & > i {
        left: auto;
        right: 2px;
        border-left-color: @arrow-fill;
      }
    }
  }
}
.item-container {
  display: inline-block;
  max-width: 80%;
  padding: .5rem 1rem;
  text-align: justify;
  background: white;
  border: 1px solid;
  border-radius: .5rem;
}
</style>
