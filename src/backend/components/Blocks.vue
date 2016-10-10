<template>
  <div class="flex-auto flex-col">
    <div class="blocks-manage mb-10">
      <div class="card hand inline-block block-item mr-5"
        v-for="block in blocks" :class="{active:block===current}"
        @click="pick(block)">
        <div class="card-header text-center">
          <h5 v-text="block.name"></h5>
        </div>
        <div class="card-body">
          <div class="text-clip" v-text="block.desc"></div>
        </div>
      </div>
    </div>
    <div class="flex-auto">
      Preview
    </div>
  </div>
</template>

<script>
import {Entry} from 'src/services/models';
import NodeList from './List';

export default {
  props: ['entry'],
  data() {
    return {
      blocks: [],
      current: null,
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    entry: 'loadData',
  },
  methods: {
    loadData() {
      Entry.Blocks.fill({id: this.entry.id}).get()
      .then(blocks => this.blocks = blocks);
    },
    pick(block) {
      this.current = block;
    },
  },
};
</script>

<style lang="less">
.blocks-manage {
  overflow-x: auto;
}
.block-item {
  min-width: 10rem;
}
</style>
