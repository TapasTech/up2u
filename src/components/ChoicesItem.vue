<template>
  <div class="item-choices">
    <div class="item-response">
      <div class="item-hint" v-text="node.content"></div>
      <div class="item-choice-wrap">
        <div class="item-container item-user"
        v-for="(choice,index) in children" ref="choices"
        v-text="choice.title" @click="pick(choice,index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNode, addNode, popNode, processNode} from 'src/services/nodes';

export default {
  props: ['node', 'loading'],
  data() {
    return {
      children: [],
    };
  },
  methods: {
    pick(choice, index) {
      const el = this.$refs.choices[index];
      const source = {
        html: el.innerHTML,
        className: el.className,
        rect: el.getBoundingClientRect(),
      };
      popNode(this.node)
      .then(() => {
        const {content} = this.node;
        return content && addNode({content});
      })
      .then(() => {
        const toNode = Object.assign({
          from: source,
        }, choice);
        processNode(toNode);
        return toNode;
      });
    },
  },
  created() {
    Promise.all(this.node.children.map(getNode))
    .then(children => this.children = children);
  },
};
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
  margin: 1rem;
  cursor: pointer;
}
</style>
