<template>
  <div class="messages">
    <component v-for="item in nodes" :is="`${item.type}-item`" :node="item"></component>
  </div>
</template>

<script>
import store from 'src/services/store';
import LinkItem from './LinkItem';
import TextItem from './TextItem';
import ChoicesItem from './ChoicesItem';

export default {
  data() {
    return store;
  },
  components: {
    LinkItem,
    TextItem,
    ChoicesItem,
  },
};
</script>
