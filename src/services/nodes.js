import {delay} from 'src/utils';

export const nodes = [];
const nodeMap = {};

const types = {
  TEXT: 'text',
  LINK: 'link',
  CHOICES: 'choices',
  CHOICE: 'choice',
};

export const root = {
  id: 1,
  type: types.TEXT,
  content: 'Hi there!',
  style: {
    color: 'blue',
    background: 'golden',
  },
  next: 2,
};
nodeMap[1] = root;
nodeMap[2] = {
  id: 2,
  type: types.LINK,
  className: 'item-user',
  content: 'Welcome to DTCJ',
  link: 'http://xxx.dtcj.com:23333/',
  next: 3,
};
nodeMap[3] = {
  id: 3,
  type: types.CHOICES,
  content: 'Do you like it?',
  children: [4, 5],
};
nodeMap[4] = {
  id: 4,
  type: types.CHOICE,
  title: 'Yes',
  content: 'Yes, I like it.',
  next: 6,
};
nodeMap[5] = {
  id: 5,
  type: types.CHOICE,
  title: 'No',
  content: 'No, show me something else.',
  next: 7,
};
nodeMap[6] = {
  id: 6,
  type: types.TEXT,
  content: 'OK, thank you.',
};
nodeMap[7] = {
  id: 7,
  type: types.TEXT,
  content: 'There is nothing else. You have to like it.'
};

export function addNode(node) {
  node.type = node.type || types.TEXT;
  if (node.type === types.CHOICE) {
    node.type = types.TEXT;
    node.className = 'item-user';
  }
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
