export default {
  1: {
    id: 1,
    type: 'text',
    content: 'Hi there!',
    style: {
      color: 'blue',
      background: 'golden',
    },
    next: 2,
  },
  2: {
    id: 2,
    type: 'link',
    content: 'Welcome to DTCJ',
    link: 'http://xxx.dtcj.com:23333/',
    next: 8,
  },
  8: {
    id: 8,
    type: 'text',
    content: 'Do you like it?',
    next: 3,
  },
  3: {
    id: 3,
    type: 'choices',
    // content: 'Do you like it?',
    children: [4, 5],
  },
  4: {
    id: 4,
    type: 'choice',
    title: 'Yes',
    content: 'Yes, I like it.',
    next: 6,
  },
  5: {
    id: 5,
    type: 'choice',
    title: 'No',
    content: 'No, show me something else.',
    next: 7,
  },
  6: {
    id: 6,
    type: 'text',
    content: 'OK, thank you.',
  },
  7: {
    id: 7,
    type: 'text',
    content: 'There is nothing else. You have to like it.'
  },
};
