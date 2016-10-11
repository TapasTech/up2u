<template>
  <div class="node-list column flex-col" :class="className">
    <h4 class="text-center" v-text="title"></h4>
    <div class="flex-auto node-list-data">
      <node-item v-for="node in nodes" :node="node" :active="node===current"></node-item>
    </div>
  </div>
</template>

<script>
import NodeItem from './Item';

export default {
  props: ['className', 'nodes', 'current', 'title'],
  components: {
    NodeItem,
  },
};
</script>

<style>
.node-list-data {
  border: 1px solid #eee;
}
</style>
