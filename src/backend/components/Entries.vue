<template>
  <div class="entry-list columns">
    <div class="column col-4">
      <div class="card hand entry-item" v-for="entry in entries"
        :class="{active:entry===current.entry}" @click="pick(entry)">
        <div class="card-header">
          <h4 class="card-title" v-text="entry.name"></h4>
          <div class="card-meta">
            <div>创建于 <span v-text="entry.createdAt"></span></div>
            <div>修改于 <span v-text="entry.updatedAt"></span></div>
          </div>
        </div>
        <div class="card-body text-ellipsis" v-text="entry.desc"></div>
      </div>
    </div>
    <div class="column col-8 entry-content flex-col">
      <div class="flex-auto flex-col" v-if="current.entry">
        <div class="columns">
          <div class="column col-2">
            <h4 class="hand entry-title" v-if="!editing" v-text="current.data.name" @click="edit"></h4>
            <input class="form-input" v-if="editing" type="text" v-model="current.data.name">
          </div>
          <div class="column col-6">
            <div class="hand" v-if="!editing" v-text="current.data.desc" @click="edit"></div>
            <input class="form-input" v-if="editing" type="text" v-model="current.data.desc">
          </div>
          <div class="column col-4 text-right">
            <button class="btn btn-primary" @click="save">Save</button>
            <button class="btn" @click="cancel">Cancel</button>
          </div>
        </div>
        <blocks :entry="current.entry" @changed="onChange"></blocks>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import {Entries} from 'src/services/models';
import Blocks from './Blocks';

export default {
  components: {
    Blocks,
  },
  data() {
    return {
      editing: null,
      entries: [],
      current: {},
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      Entries.get().then(entries => {
        this.entries = entries;
      });
    },
    edit() {
      this.editing = true;
    },
    pick(entry) {
      this.editing = null;
      this.current = {
        entry,
        data: {
          id: entry.id,
          name: entry.name,
          desc: entry.desc,
          blockIds: entry.blocks,
        },
      };
    },
    onChange(blocks) {
      this.current.data.blockIds = blocks.map(block => block.id);
    },
    save() {
      Entries.put(this.current.data.id, this.current.data)
      .then(entry => {
        const i = this.entries.indexOf(this.current.entry);
        Vue.set(this.entries, i, entry);
        this.pick(entry);
      });
    },
    cancel() {
      this.pick(this.current.entry);
    },
  },
};
</script>

<style lang="less">
.entry-list {
  height: 100vh;
  > * {
    overflow: auto;
  }
}
.entry-content {
  background: white;
}
.entry-title {
  margin-top: 0;
}
</style>
