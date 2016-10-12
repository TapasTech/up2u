<template>
  <div class="messages">
    <component v-for="item in nodes" :is="`${item.type}-item`"
      :class="item.className" :node="item" :key="item"></component>
  </div>
</template>

<script>
import store from 'src/services/store';
import events from 'src/services/events';
import LinkItem from './LinkItem';
import TextItem from './TextItem';

export default {
  components: {
    LinkItem,
    TextItem,
  },
  data() {
    return store;
  },
  created() {
    events.$on('SCROLL_BOT', this.scrollBottom);
  },
  beforeDestroy() {
    events.$off('SCROLL_BOT', this.scrollBottom);
  },
  methods: {
    scrollBottom() {
      const el = this.$el;
      el.scrollTop = el.scrollHeight - el.clientHeight;
    },
  },
};
</script>

<style lang="less">
.messages {
  height: 0;
  padding: 1rem 1rem 2rem;
  overflow: auto;
}
</style>
