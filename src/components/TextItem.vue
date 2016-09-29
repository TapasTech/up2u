<template>
  <div class="item" :class="node.className">
    <div class="item-container" v-html="node.content"></div>
    <div class="item-arrow">
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['node', 'loading'],
  data() {
    return {};
  },
  mounted() {
    console.log(this);
  },
}
</script>

<style lang="less" scoped>
@color-border: #233;
@color-back: white;
@color-text: #333;
@arrow-width: .6rem;
@arrow-height: .4rem;
@arrow-stroke: @color-border;
@arrow-fill: @color-back;
.item-container {
  display: inline-block;
  max-width: 80%;
  padding: .5rem 1rem;
  text-align: justify;
  background: @color-back;
  border: 1px solid @color-border;
  border-radius: .5rem;
  color: @color-text;
}
.item-arrow {
  &, & > i {
    border-top: @arrow-height solid transparent;
    border-bottom: @arrow-height solid transparent;
    border-right: @arrow-width solid;
    border-left: 0;
  }
  position: absolute;
  top: 50%;
  transform: translate(-100%,-50%);
  border-right-color: @arrow-stroke;
  & > i {
    position: absolute;
    left: 2px;
    top: -@arrow-height;
    border-right-color: @arrow-fill;
  }
}
.item-user {
  text-align: right;
  .item-arrow {
    &, & > i {
      border-right: 0;
      border-left: @arrow-width solid;
    }
    right: 0;
    transform: translate(100%,-50%);
    border-left-color: @arrow-stroke;
    & > i {
      left: auto;
      right: 2px;
      border-left-color: @arrow-fill;
    }
  }
}
</style>
