<template>
  <div class="flex-col manage-blocks">
    <h1>up2u management</h1>
    <div class="flex-1 flex-row data-list">
      <node-list class-name="parent-nodes" :nodes="parents" title="Parent"></node-list>
      <node-list class-name="sibling-nodes" :nodes="siblings" :current="current" title="Siblings"></node-list>
      <node-list class-name="child-nodes" :nodes="children" title="Children"></node-list>
    </div>
  </div>
</template>

<script>
import {Node} from 'src/services/models';
import NodeList from './List';

export default {
  components: {
    NodeList,
  },
  data() {
    return {
      current: null,
      parents: [],
      siblings: [],
      children: [],
    };
  },
  computed: {
    query() {
      return this.$route.query.data;
    },
  },
  created() {
    this.loadData();
  },
  watch: {
    'query.id': 'loadData',
  },
  methods: {
    loadData() {
      this.getCurrent().then(this.getOthers);
    },
    getCurrent() {
      const id = this.query.id;
      if (!id) {
        this.children = [];
        return Promise.resolve();
      }
      return Node.Children.fill({id}).get(null, {self: 1})
      .then(children => {
        let current;
        this.children = children.filter(item => {
          if (item.id == id) current = item;
          else return true;
        });
        return current || {};
      });
    },
    getOthers(current) {
      const parent = current.parent || 0;
      // FIXME: restful-fetch does not receive falsy value 0 as data
      const id = parent.toString();
      return Node.Children.fill({id}).get(null, {self: 1})
      .then(siblings => {
        this.parents = [];
        this.siblings = siblings.filter(item => {
          if (item.id == parent) this.parents = [item];
          else {
            if (item.id === current.id) this.current = item;
            return true;
          }
        });
        if (this.siblings.length && !this.current) {
          this.pick(this.siblings[0].id);
        }
      }, () => {
        this.parents = [];
        this.siblings = [];
      });
    },
    pick(id) {
    },
  },
};
</script>

<style>
.manage-blocks {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
}
.data-list {
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;
  > * {
    width: 32%;
    background: white;
  }
}

@media (max-width: 768px) {
  .data-list > * {
    flex: 0 0 100%;
  }
}
</style>
