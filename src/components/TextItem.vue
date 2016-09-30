<template>
  <div class="item" :class="className">
    <div class="item-container" v-html="node.content" ref="el"></div>
  </div>
</template>

<script>
export default {
  props: ['node', 'loading'],
  data() {
    return {
      hide: !!this.node.from,
    };
  },
  computed: {
    className() {
      const names = [];
      this.node.className && names.push(this.node.className);
      this.hide && names.push('item-hide');
      return names.join(' ');
    },
  },
  mounted() {
    const source = this.node.from;
    if (source) {
      const el = document.createElement('div');
      el.innerHTML = source.html;
      el.className = source.className;
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
          transition: '.5s',
          left: rect.left + 'px',
          top: rect.top + 'px',
          width: rect.width + 'px',
          height: rect.height + 'px',
        });
        setTimeout(() => {
          el.remove();
          this.hide = false;
        }, 500);
      });
    }
  },
  methods: {
    setStyles(el, styles) {
      const style = Object.keys(styles)
      .map(key => `${key}:${styles[key]}`)
      .join(';');
      el.setAttribute('style', style);
    },
  },
}
</script>

<style lang="less" scoped>
</style>
