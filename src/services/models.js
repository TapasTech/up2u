import Restful from 'restful-fetch';

const restful = new Restful({
  root: '/api',
  presets: ['json'],
});

function parseNodes(data, options) {
  if (options.relative) {
    data.content = JSON.parse(data.content);
  } else {
    data.forEach(item => item.content = JSON.parse(item.content));
  }
  return data;
}

export const Node = restful.model('nodes');
Node.posthandlers.push(parseNodes);

Node.Tree = Node.model(':id', 'tree');
Node.Tree.posthandlers.push(parseNodes);

Node.Children = Node.model(':id', 'children');
Node.Children.posthandlers.push(parseNodes);
