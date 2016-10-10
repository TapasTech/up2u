import Restful from 'restful-fetch';

const restful = new Restful({
  root: '/api',
  presets: ['json'],
});

function parseItems(parse) {
  return function (data, options) {
    if (options.relative) {
      parse(data);
    } else {
      if (data.rows) {
        let rows = [];
        const meta = Object.keys(data).reduce((meta, key) => {
          if (key === 'rows') {
            rows = data[key];
          } else {
            meta[key] = data[key];
          }
          return meta;
        }, {});
        rows.meta = meta;
        data = rows;
      }
      data.forEach(item => parse(item));
    }
    return data;
  };
}

function decodeField(field) {
  return function (data) {
    try {
      data[field] = JSON.parse(data[field]);
    } catch (e) {
      data[field] = {};
    }
    return data;
  };
}

const posthandleBlock = parseItems(decodeField('content'));

export const Entries = restful.model('entries');
Entries.posthandlers.push(parseItems(decodeField('data')));

Entries.Blocks = Entries.model(':id', 'blocks');
Entries.Blocks.posthandlers.push(posthandleBlock);

export const Blocks = restful.model('blocks');
Blocks.posthandlers.push(posthandleBlock);
