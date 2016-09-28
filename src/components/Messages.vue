<template>
  <div class="messages">
    <item v-for="item in items" :node="item"></item>
  </div>
</template>

<script>
import store from 'src/services/store';
import Item from './Item';

export default {
  data() {
    return store;
  },
  components: {
    Item,
  },
};
</script>
