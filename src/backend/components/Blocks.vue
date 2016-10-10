<template>
  <div class="flex-auto flex-col">
    <div class="flex-row blocks-manage mb-10">
      <block v-for="block in blocks" :active="current===block" :block="block" :on-pick="pick"></block>
      <div class="card hand inline-block block-item block-item-new"
        :class="{active:current===newItem}" @click="add">
        <div class="card-header text-center">
          <h5>+</h5>
        </div>
      </div>
    </div>
    <div class="flex-auto" v-if="current!==newItem">
      Preview
    </div>
    <div class="flex-auto flex-col" v-if="current===newItem">
      <input class="form-input mb-10" placeholder="Search here" v-model="searchData.value">
      <div class="flex-auto toast">
        <block v-for="block in searchData.results" :block="block" :on-pick="pickAdd"></block>
      </div>
      <ul class="pagination" :class="{invisible:!searchData.meta.totalPages}">
        <li class="page-item" v-for="page in searchData.pages">
          <span v-if="!page.value" v-text="page.title"></span>
          <a v-if="page.value" v-text="page.title" @click.prevent="transitionTo(page.value)"></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Entries, Blocks} from 'src/services/models';
import {debounce} from 'src/utils';
import Block from './Block';

const newItem = {};

export default {
  props: ['entry'],
  components: {
    Block,
  },
  data() {
    return {
      newItem,
      blocks: [],
      current: null,
      searchData: null,
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
      .then(blocks => this.blocks = blocks);
    },
    pick(block) {
      this.current = block;
      this.searchData = null;
    },
    remove(block) {
    },
    add() {
      this.current = newItem;
      this.searchData = {
        value: '',
        results: null,
        meta: {},
        pages: [],
      };
    },
    pickAdd(block) {
      this.blocks.push(block);
    },
    search() {
      Blocks.get(null, {name: this.searchData.value})
      .then(results => {
        this.searchData.results = results;
        const meta = this.searchData.meta = results.meta;
        const pages = [{
          title: 1,
          value: 1,
        }];
        meta.currentPage - 1 > 2 && pages.push({
          title: '...',
        });
        meta.currentPage - 1 > 1 && pages.push({
          title: meta.currentPage - 1,
          value: meta.currentPage - 1,
        });
        meta.currentPage > 1 && pages.push({
          title: meta.currentPage,
        });
        meta.currentPage < meta.totalPages && pages.push({
          title: meta.currentPage + 1,
          value: meta.currentPage + 1,
        });
        meta.currentPage + 1 < meta.totalPages && pages.push({
          title: meta.currentPage + 2,
          value: meta.currentPage + 2,
        });
        meta.currentPage + 2 < meta.totalPages && pages.push({
          title: '...',
        });
        meta.currentPage + 1 < meta.totalPages && pages.push({
          title: meta.totalPages,
          value: meta.totalPages,
        });
        this.searchData.pages = pages;
      });
    },
    transitionTo(page) {
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
</style>
