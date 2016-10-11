<template>
  <div class="card hand block-item mr-5"
    :class="{active:active}" @click="handleClick">
    <div class="card-header text-center">
      <button v-if="active" class="btn btn-clear float-right" @click="remove(block)"></button>
      <h5 v-text="block.name"></h5>
    </div>
    <div class="card-body">
      <div class="text-ellipsis" v-text="block.desc"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['block', 'active', 'onPick'],
  methods: {
    handleClick() {
      this.onPick && this.onPick(this.block);
    },
  },
};
</script>
