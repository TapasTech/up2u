<template>
  <a class="item" :class="node.className"
  :href="node.link" target="_blank">
    <div class="item-container" v-html="node.content"></div>
    <div class="item-go">&gt;</div>
  </a>
</template>

<script>
export default {
  props: ['node', 'loading'],
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
}
</script>

<style lang="less" scoped>
.item {
  cursor: pointer;
}
.item-container {
  display: block;
  padding: 1rem .5rem;
  background: white;
}
.item-go {
  position: absolute;
  width: 1rem;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #888;
}
</style>
