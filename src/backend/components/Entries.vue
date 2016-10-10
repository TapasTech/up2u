<template>
  <div class="entry-manage columns">
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
    <div class="column col-8 entry-list flex-col">
      <div class="flex-auto flex-col" v-if="current.entry">
        <h4 v-text="current.entry.name"></h4>
        <p v-text="current.entry.desc"></p>
        <blocks :entry="current.entry"></blocks>
      </div>
    </div>
  </div>
</template>

<script>
import {Entries} from 'src/services/models';
import Blocks from './Blocks';

export default {
  components: {
    Blocks,
  },
  data() {
    return {
      entries: [],
      current: {},
    };
  },
  created() {
    Entries.get().then(entries => {
      this.entries = entries;
    });
  },
  methods: {
    pick(entry) {
      this.current = {entry};
    },
  },
};
</script>

<style lang="less">
.entry-manage {
  height: 100vh;
  > * {
    overflow: auto;
  }
}
.entry-list {
  background: white;
}
</style>
