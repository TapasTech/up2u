<template>
  <div class="flex-auto flex-col">
    <div class="flex-row blocks-manage mb-10">
      <block v-for="block in blocks" :active="current.block===block" :block="block" :on-pick="pick"></block>
      <div class="card hand block-item block-item-new"
        :class="{active:current.block===placeholderNew}" @click="addBlock">
        <div class="card-header text-center">
          <h5>+</h5>
        </div>
      </div>
    </div>
    <div class="flex-auto flex-col" v-if="current.data">
      <block-edit :block="current.data" :on-save="updateBlock"></block-edit>
    </div>
    <div class="flex-auto flex-col" v-if="!current.data">
      <input class="form-input mb-10" placeholder="Search here" v-model="searchData.value">
      <div class="flex-auto toast block-list">
        <div class="card hand float-left block-item block-item-new mr-5" @click="createBlock">
          <div class="card-header text-center">
            <h5>+</h5>
          </div>
          <div class="card-body"></div>
        </div>
        <block v-for="block in searchData.results" :block="block" :on-pick="pickAdd"></block>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {Entries, Blocks} from 'src/services/models';
import {debounce} from 'src/utils';
import Block from './Block';
import BlockEdit from './BlockEdit';

const placeholderNew = {};
const newBlock = {
  name: 'NEW',
};

export default {
  props: ['entry'],
  components: {
    Block,
    BlockEdit,
  },
  data() {
    return {
      placeholderNew,
      blocks: [],
      current: {},
      searchData: {
        value: '',
        results: null,
        meta: {},
      },
    };
  },
  created() {
    this.loadData();
    this.search = debounce(this.search, 300);
    this.addBlock();
  },
  watch: {
    entry: 'loadData',
    ['searchData.value']() {
      this.search();
    },
  },
  methods: {
    loadData() {
      Entries.Blocks.fill({id: this.entry.id}).get()
      .then(blocks => this.blocks = blocks);
    },
    pick(block) {
      this.current = {block, data: block};
    },
    remove(block) {
    },
    addBlock() {
      this.current = {block: placeholderNew};
      this.search();
    },
    createBlock() {
      Vue.set(this.current, 'data', {});
    },
    pickAdd(block) {
      const i = this.blocks.findIndex(item => item.id === block.id);
      if (~i) Vue.set(this.blocks, i, block);
      else this.blocks.push(block);
    },
    search() {
      Blocks.get(null, {name: this.searchData.value})
      .then(results => {
        this.searchData.results = results;
        const meta = this.searchData.meta = results.meta;
      });
    },
    updateBlock(data) {
      (data.id ? Blocks.put(data.id, data) : Blocks.post(data))
      .then(block => {
        this.pickAdd(block);
        console.log(block);
      });
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
  &-new {
    border-style: dashed;
  }
}
.block-list {
  .block-item {
    float: left;
  }
}
</style>
