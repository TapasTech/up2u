import events from 'src/services/events';
import {delay, idGenerator} from 'src/utils';

let nodeMap = {};
export const nodes = [];
const supportedTypes = [
  'text',
  'link',
  'choices',
  'choice',
];
const types = supportedTypes.reduce((res, item) => {
  res[item] = item;
  return res;
}, {});

const getId = idGenerator('_node_');

export function addNode(node) {
  node.type = node.type || types.text;
  if (node.type === types.choice) {
    node.type = types.text;
    node.className = 'item-user';
  }
  node._name = node._name || getId();
  if (nodeMap[node._name]) {
    console.warn(`Node ${node._name} is overwritten!`)
  }
  nodeMap[node._name] = node;
  return node;
}

export function pushNode(id) {
  if (typeof id === 'object') id = addNode(id)._name;
  const node = nodeMap[id];
  node && nodes.push(node);
  return node;
}

export function popNode(node) {
  if (typeof node !== 'object') node = nodeMap[node];
  const i = nodes.indexOf(node);
  return ~i && nodes.splice(i, 1) ? Promise.resolve(node) : Promise.reject();
}

function doProcessNode(id) {
  const node = pushNode(id);
  if ([
    types.choices,
  ].includes(node.type)) return;
  return delay(node.delay || 1000)
  .then(() => events.$emit('PUSH', id))
  .then(() => getNext(node))
  .then(nextId => nextId && processNode(nextId));
}

export function processNode(id) {
  if (typeof id === 'object') id = addNode(id)._name;
  return doProcessNode(id);
}

export function processBlock(block) {
  flushNodes();
  const nodes = block.content;
  nodes.forEach(addNode);
  const exit = nodes[nodes.length - 1]._name;
  return new Promise(resolve => {
    function listen(id) {
      if (id === exit) {
        events.$off('PUSH', listen);
        resolve();
      }
    }
    events.$on('PUSH', listen);
    processNode(nodes[0]._name);
  });
}

export function getNode(id) {
  return Promise.resolve(nodeMap[id]);
}

export function getNext(node) {
  return node._goto;
}

export function flushNodes() {
  nodeMap = {};
}

export function checkNodes(nodes) {
  const getByName = function (name) {
    const next = map[name];
    if (!next) throw new Error(`Node not found: ${name}`);
    return next;
  };
  const getName = idGenerator('__');
  const map = {};
  nodes = nodes.map(function (node, index) {
    node = Object.assign({}, node);
    if (node.name && node.name.startsWith('__')) throw new Error(`[${index}] Invalid name: ${node.name}`);
    node._name = node.name || getName();
    node._index = index;
    node._touched = false;
    const existed = map[node._name];
    if (existed) throw new Error(`[${index}] Name exists: ${node._name}`);
    map[node._name] = node;
    return node;
  });
  const queue = [nodes[0]];
  while (queue.length) {
    const node = queue.shift();
    node._touched = true;
    if (node.type === 'choices') {
      queue.push(...node.children.map(getByName));
    } else if (node.goto) {
      queue.push(getByName(node.goto));
      node._goto = node.goto;
    } else {
      const next = nodes[node._index + 1];
      if (next) {
        node._goto = next._name;
        queue.push(next);
      }
    }
  }
  const untouched = nodes.find(node => !node._touched);
  if (untouched) {
    throw new Error(`[${untouched._index}] Got isolated node!`);
  }
  return nodes;
}
