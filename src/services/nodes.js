const nodeMap = {};

const types = {
  HTML: 'html',
  LINK: 'link',
  CHOICES: 'choices',
  CHOICE: 'choice',
};

export const root = {
  id: 1,
  type: types.HTML,
  content: 'Hi there!',
  style: {
    color: 'blue',
    background: 'golden',
  },
  delay: 1000,
  next: 2,
};
nodeMap[1] = root;
nodeMap[2] = {
  id: 2,
  type: types.LINK,
  className: 'item-user',
  content: 'Welcome to OSC',
  link: 'http://www.oschina.net',
};

export function getNext(node) {
  const {next: nextId} = node;
  const nextNode = nodeMap[nextId];
  return nextNode
  ? Promise.resolve(nextNode)
  : fetchNext(node.id);
}

function fetchNext(id) {
  return null;
}
