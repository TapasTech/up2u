<template>
  <div class="item-choices">
    <div class="item-hint" v-text="node.content"></div>
    <div class="item-container">
      <div class="item-choice" v-for="choice in children"
      v-text="choice.title" @click="pick(choice)"></div>
    </div>
  </div>
</template>

<script>
import {delay} from 'src/utils';
import {getNode, addNode, popNode, processNode} from 'src/services/nodes';

export default {
  props: ['node', 'loading'],
  data() {
    return {
      children: [],
    };
  },
  methods: {
    pick(choice) {
      popNode(this.node)
      .then(() => {
        const {content} = this.node;
        return content && addNode({content});
      })
      .then(() => processNode(choice));
    },
  },
  created() {
    Promise.all(this.node.children.map(getNode))
    .then(children => this.children = children);
  },
}
</script>

<style lang="less" scoped>
.item-choices {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem;
  background: inherit;
}
.item-hint {
  text-align: center;
  font-size: 1.2rem;
}
.item-container {
  text-align: center;
}
.item-choice {
  display: inline-block;
  margin: 1rem;
  padding: .5rem 1rem;
  background: #ccf;
  cursor: pointer;
  border-radius: 1rem;
}
</style>
