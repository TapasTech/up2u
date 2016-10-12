<template>
  <div :class="['item',{'item-hide':node.from}]">
    <div class="item-container" v-html="node.data" ref="el"></div>
  </div>
</template>

<script>
import events from 'src/services/events';

export default {
  props: ['node'],
  mounted() {
    events.$emit('SCROLL_BOT');
    this.animateFrom(this.node.from);
  },
  methods: {
    setStyles(el, styles) {
      const style = Object.keys(styles)
      .map(key => `${key}:${styles[key]}`)
      .join(';');
      el.setAttribute('style', style);
    },
    animateFrom(source) {
      if (!source) return;
      const el = document.createElement('div');
      el.innerHTML = source.html;
      el.className = `item-transition ${source.className}`;
      this.setStyles(el, {
        position: 'absolute',
        left: source.rect.left + 'px',
        top: source.rect.top + 'px',
        width: source.rect.width + 'px',
        height: source.rect.height + 'px',
      });
      this.$el.parentNode.appendChild(el);
      this.$nextTick(() => {
        const rect = this.$refs.el.getBoundingClientRect();
        this.setStyles(el, {
          position: 'absolute',
          left: rect.left + 'px',
          top: rect.top + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
        });
        setTimeout(() => {
          el.remove();
          this.node.from = null;
        }, 500);
      });
    },
  },
};
</script>
