import {delay} from 'src/utils';
import nodeMap from './mock';

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
  nodes.push(node);
  return node;
}

export function popNode(node) {
  const i = nodes.indexOf(node);
  return ~i && nodes.splice(i, 1) ? Promise.resolve(node) : Promise.reject();
}

function doProcessNode(node) {
  addNode(node);
  return delay(node.delay || 1000)
  .then(() => getNext(node))
  .then(next => {
    if (!next) return Promise.reject();
    return processNode(next);
  });
}

export function processNode(node) {
  return doProcessNode(node)
  .catch(() => console.log('No more nodes.'));
}

export function getNode(id) {
  return Promise.resolve(nodeMap[id]);
}

export function getNext(node) {
  const {next} = node;
  return getNode(next)
  .then(nextNode => nextNode || fetchNext(node.id));
}

function fetchNext(id) {
  return null;
}
