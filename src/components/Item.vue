<template>
  <div class="item" :class="node.className">
    <div class="item-container">
      <div v-if="node.type=='html'" v-html="node.content"></div>
      <a v-if="node.type=='link'" v-html="node.content" target="_blank" :href="node.link"></a>
    </div>
    <div class="item-arrow">
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['node', 'loading', 'type'],
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
}
</script>
