<template>
  <div class="node-list flex-col" :class="className">
    <h2 class="text-center" v-text="title"></h2>
    <div class="flex-auto">
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
