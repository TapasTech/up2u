<template>
  <div class="flex-col flex-auto">
    <div class="columns">
      <div class="column col-2">
        <input class="form-input" v-model="edit.name" placeholder="Name">
      </div>
      <div class="column col-6">
        <input class="form-input" v-model="edit.desc" placeholder="Description">
      </div>
      <div class="column col-4">
        <button class="btn btn-primary" @click="save">Save</button>
      </div>
    </div>
    <div class="flex-auto code" ref="code"></div>
    <!--
    <div class="flex-row flex-auto">
      <node-list class-name="parent-nodes" :nodes="nodes.parents" title="Parent"></node-list>
      <node-list class-name="sibling-nodes" :nodes="nodes.siblings" :current="nodes.current" title="Siblings"></node-list>
      <node-list class-name="child-nodes" :nodes="nodes.children" title="Children"></node-list>
    </div>
    -->
  </div>
</template>

<script>
import yaml from 'js-yaml';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/yaml/yaml';
// import NodeList from './List';
import {checkNodes} from 'src/services/nodes';

export default {
  props: ['block', 'onSave'],
  components: {
    // NodeList,
  },
  data() {
    return {
      edit: {},
      content: null,
    };
  },
  watch: {
    block(block) {
      this.loadData(block);
    },
    content(content) {
      if (this.cachedContent !== content) {
        this.cachedContent = content;
        this.cm && this.cm.setValue(content);
      }
    },
  },
  created() {
    this.loadData(this.block);
  },
  mounted() {
    const cm = this.cm = CodeMirror(this.$refs.code, {
      lineNumbers: true,
      mode: 'yaml',
      tabSize: 2,
      value: this.cachedContent || '',
    });
    cm.on('change', (cm, _e) => {
      this.content = this.cachedContent = cm.getValue();
    });
  },
  methods: {
    loadData(block) {
      this.edit = {
        id: block.id,
        name: block.name,
        desc: block.desc,
      };
      let nodes = [];
      try {
        nodes = block.content.map(node => Object.keys(node).reduce((res, key) => {
          if (!key.startsWith('_')) res[key] = node[key];
          return res;
        }, {}));
      } catch (e) {
        // ignore
      }
      this.content = nodes.length ? yaml.safeDump(nodes) : '';
      this.cm && this.cm.setValue(this.content);
    },
    save() {
      const nodes = yaml.safeLoad(this.content);
      let validatedContent;
      try {
        validatedContent = checkNodes(nodes);
      } catch (e) {
        alert(e.toString());
      }
      this.onSave({
        ...this.edit,
        content: validatedContent,
      });
    },
  },
};
</script>

<style lang="less">
.code {
  position: relative;
  > .CodeMirror {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
