<template>
  <a class="item" :class="node.className"
  :href="node.content.link" target="_blank">
    <div class="item-container">
      <div v-html="node.content.data"></div>
      <div class="item-go">&gt;</div>
    </div>
  </a>
</template>

<script>
export default {
  props: ['node', 'loading'],
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.item {
  cursor: pointer;
}
.item-container {
  position: relative;
  display: block;
  padding-top: 1rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
}
.item-go {
  position: absolute;
  width: 2rem;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #888;
  .item:hover & {
    animation: arrow-move 1s infinite;
  }
}

@keyframes arrow-move {
  50% {
    transform: translate(10%,-50%);
  }
}
</style>
