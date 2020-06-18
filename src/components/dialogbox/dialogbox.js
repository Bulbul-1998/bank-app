import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './dialogbox.hbs';

/**
 * 
 * @param {DialogOptions} options 
 */
function dialogbox(options) {
  const html = mustache.render(template, options);
  const $dialogs = tag('div', {
    className: 'coponent',
    innerHTML: html,
    attr: {
      "data-id": "ksnhf5kd"
    }
  });

  if (options.oninteract) $dialogs.onclick = options.oninteract.bind($dialogs);

  return $dialogs;
}

export default dialogbox;