<template>
  <div class="flex-auto flex-col">
    <div class="flex-row blocks-manage mb-10">
      <block class="mr-5"
        v-for="block in blocks" :active="current.block===block"
        :block="block" :on-pick="pick" :on-remove="remove"></block>
      <div class="card hand block-item block-item-new"
        :class="{active:current.block===placeholderNew}" @click="addBlock">
        <div class="card-header text-center">
          <h5>+</h5>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex-auto flex-col" v-if="current.data">
      <block-edit :block="current.data" :on-save="onUpdate"></block-edit>
    </div>
    <div class="flex-auto flex-col" v-if="!current.data">
      <div class="columns">
        <div class="column col-6">
          <input class="form-input" placeholder="Search here" v-model="searchData.value">
        </div>
        <!--
        <div class="column col-6">
          <label class="form-checkbox">
            <input type="checkbox" v-model="searchData.snippetsOnly" @change="search">
            <i class="form-icon"></i>
            Search for snippets only
          </label>
        </div>
        -->
      </div>
      <div class="flex-auto toast block-list">
        <div class="card hand float-left block-item block-item-new mr-5 mb-5" @click="createBlock">
          <div class="card-header text-center">
            <h5><em>EMPTY</em></h5>
          </div>
          <div class="card-body"></div>
        </div>
        <block class="mr-5 mb-5"
          v-for="block in searchData.results" :block="block" :on-pick="pickAdd"></block>
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
        snippetsOnly: true,
      },
    };
  },
  created() {
    this.loadData();
    this.search = debounce(this.search, 300);
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
      .then(blocks => {
        this.blocks = blocks;
        const id = this.current.block && this.current.block.id;
        this.pick(id && blocks.find(block => block.id === id));
      });
    },
    pick(block) {
      if (block) {
        this.current = {block, data: block};
      } else {
        this.addBlock();
      }
    },
    remove(block) {
      const i = this.blocks.indexOf(block);
      ~i && this.blocks.splice(i, 1);
      this.addBlock();
      this.updateBlocks();
    },
    addBlock() {
      this.current = {block: placeholderNew};
      this.search();
    },
    createBlock() {
      Vue.set(this.current, 'data', {});
    },
    pickAdd(block) {
      this.current = {
        block: placeholderNew,
        data: {
          ...block,
          id: null,
          snippet: true,
        },
      };
    },
    search() {
      const params = {
        name: this.searchData.value,
      };
      if (!this.searchData.snippetsOnly) params.all = '';
      Blocks.get(null, params)
      .then(results => {
        this.searchData.results = results;
        this.searchData.meta = results.meta;
      });
    },
    onUpdate(block) {
      const i = this.blocks.findIndex(item => item.id === block.id);
      ~i ? Vue.set(this.blocks, i, block) : this.blocks.push(block);
      this.pick(block);
      this.updateBlocks();
    },
    updateBlocks() {
      this.$emit('changed', this.blocks);
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
