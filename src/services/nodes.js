import {delay} from 'src/utils';

const nodeMap = {};
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

const getId = function () {
  var id = 0;
  return () => `_node_${++ id}`;
}();

export function addNode(node) {
  node.type = node.type || types.text;
  if (node.type === types.choice) {
    node.type = types.text;
    node.className = 'item-user';
  }
  node.id = node.id || getId();
  if (node.parent) {
    const parent = nodeMap[node.parent];
    if (parent) {
      const children = parent.children = parent.children || [];
      children.push(node.id);
    }
  }
  if (nodeMap[node.id]) {
    console.warn(`Node ${node.id} is overwritten!`)
  }
  nodeMap[node.id] = node;
  return node;
}

export function pushNode(id) {
  if (typeof id === 'object') id = addNode(id).id;
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
  ].includes(node.type)) return Promise.reject();
  return delay(node.delay || 1000)
  .then(() => getNext(node))
  .then(nextId => {
    if (!nextId) return Promise.reject();
    return processNode(nextId);
  });
}

export function processNode(id) {
  if (typeof id === 'object') id = addNode(id).id;
  return doProcessNode(id)
  .catch(() => console.log('No more nodes.'));
}

export function getNode(id) {
  return Promise.resolve(nodeMap[id]);
}

export function getNext(node) {
  return node.children[0];
}

function fetchNext(id) {
  return null;
}
