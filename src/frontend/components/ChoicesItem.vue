<template>
  <div class="item-choices">
    <div class="item-response">
      <div class="item-hint" v-text="node.data"></div>
      <div class="item-choice-wrap">
        <div class="item-container item-user"
        v-for="(choice,index) in children" ref="choices"
        v-text="choice.title" @click="pick(choice,index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import events from 'src/services/events';
import {getNode, pushNode, processNode} from 'src/services/nodes';

export default {
  props: ['node'],
  data() {
    return {
      children: [],
    };
  },
  watch: {
    children() {
      this.$nextTick(() => events.$emit('SCROLL_BOT'));
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
      const {data} = this.node;
      data && pushNode({data});
      const toNode = Object.assign({
        from: source,
      }, choice, {
        // clear _name to force create a new node
        _name: null,
      });
      processNode(toNode);
    },
  },
  created() {
    Promise.all(this.node.children.map(getNode))
    .then(children => this.children = children);
  },
};
</script>

<style lang="less">
.item-choices {
  @bg-color: #eee;
  position: relative;
  background: @bg-color;
  &::before {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    height: 2rem;
    background: linear-gradient(to top, @bg-color, transparent);
  }
  .item-container {
    margin: 1rem;
    cursor: pointer;
  }
}
.item-hint {
  text-align: center;
  font-size: 1.2rem;
}
</style>
