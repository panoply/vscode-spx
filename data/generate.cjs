const { writeFileSync } = require('fs');

/* -------------------------------------------- */
/* EVENTS                                       */
/* -------------------------------------------- */

const globalEvents = require('./events/global.json');
const tagEvents = require('./events/tags.json');

/* -------------------------------------------- */
/* SPX SPECIFIC                                 */
/* -------------------------------------------- */

const tagDirectives = require('./directives/tags.json');
const hrefDirectives = require('./directives/href.json');
const globalDirectives = require('./directives/global.json');
const componentDirectives = require('./directives/components.json');

/* -------------------------------------------- */
/* BUILD HTML DATA                              */
/* -------------------------------------------- */

const tagAttributes = {};

for (const attr of tagDirectives.concat(tagEvents)) {
  if(Array.isArray(attr.tags)) {
    for (const tag of [ ...attr.tags ]) {
      if('tags' in attr) delete attr.tags
      if(tag in tagAttributes) {
        tagAttributes[tag].push(attr)
      } else {
        tagAttributes[tag] = [ attr ]
      }
    }
  }
}

const tags = [];

for ( const name in tagAttributes) {
  tags.push({
    name,
    attributes: tagAttributes[name]
  })
}


const schema = JSON.stringify({
  version: 1.1,
  tags: [
    {
      name: 'a',
      attributes: hrefDirectives
    },
    ...tags
  ],
  globalAttributes: [
    ...componentDirectives,
    ...globalDirectives,
    ...globalEvents
  ]
}, null, 2);

writeFileSync('../spx.html-data.json', schema)