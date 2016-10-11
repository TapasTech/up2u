<template>
  <div id="app">
    <entries></entries>
  </div>
</template>

<script>
import Entries from './Entries';

export default {
  components: {
    Entries,
  },
};
</script>

<style lang="less">
@import '~normalize.css';
@import '~less!spectre.css';

.text-muted {
  color: #999;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-auto {
  flex: auto;
}
.flex-1 {
  flex: 1;
}

body {
  font-family: Helvetica, sans-serif;
  font-size: 14px;
  background: #eee;
}
#app {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.card {
  background: #fbfbfb;
  &.active,
  &:hover {
    background: white;
  }
  &.active {
    border-color: #27ae60;
  }
}
</style>
