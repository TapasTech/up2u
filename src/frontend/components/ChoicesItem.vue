<template>
  <div class="item-choices">
    <div class="item-response">
      <div class="item-hint" v-text="content.data"></div>
      <div class="item-choice-wrap">
        <div class="item-container item-user"
        v-for="(choice,index) in children" ref="choices"
        v-text="choice.content.title" @click="pick(choice,index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNode, pushNode, popNode, processNode} from 'src/services/nodes';

export default {
  props: ['node', 'loading'],
  data() {
    return {
      children: [],
    };
  },
  computed: {
    content() {
      return this.node.content || {};
    },
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
        return content && pushNode({content});
      })
      .then(() => {
        const toNode = Object.assign({
          from: source,
        }, choice, {
          id: null,
        });
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
