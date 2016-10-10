<template>
  <fieldset class="node-item" :class="{active:active,disabled:node.disabled}">
    <legend v-text="node.type"></legend>
    <div class="node-item-content">
      <div class="node-item-entry flex-row" v-for="key in keys">
        <div class="node-item-key" v-text="key"></div>
        <div class="node-item-value" v-text="content[key]"></div>
      </div>
      <div class="node-item-entry flex-row">
        <div class="node-item-key">delay</div>
        <div class="node-item-value" v-text="node.delay"></div>
      </div>
      <div class="node-item-entry flex-row">
        <div class="node-item-key">disabled</div>
        <div class="node-item-value" v-text="node.disabled"></div>
      </div>
    </div>
    <div class="node-item-buttons">
      <button @click="spread" v-if="!active">Spread</button>
    </div>
  </fieldset>
</template>

<script>
const typeKeys = {
  text: ['data'],
  link: ['data', 'link'],
  choice: ['title', 'data'],
  choices: ['data'],
};

export default {
  props: ['node', 'active'],
  computed: {
    keys() {
      return typeKeys[this.node.type];
    },
    content() {
      return this.node.content || {};
    },
  },
  methods: {
    spread() {
    },
  },
};
</script>

<style lang="less">
.node-item {
  margin: .5rem;
  border-radius: .3rem;
  border-color: #ddd;
  color: #333;
  legend {
    padding: .3rem;
  }
  &.active {
    border-color: blue;
  }
  &.disabled {
    color: #ddd;
  }
  &-buttons {
    text-align: right;
  }
  &:not(:hover) .node-item-buttons {
    visibility: hidden;
  }
  &-entry {
    margin-bottom: .5rem;
  }
  &-key {
    width: 30%;
  }
  &-value {
    width: 70%;
  }
}
</style>
