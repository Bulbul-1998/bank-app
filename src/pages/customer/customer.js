import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './customer.hbs';
import css from './customer.scss';

function customer() {
  const html = mustache.render(template, {});
  const $page = `<div data-id="l76r5mj3" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="l76r5mj3"]`) || tag('style', {
    textContent: css.toString(),
    attr: {
      "data-id": "l76r5mj3"
    }
  });

  return {
    render: () => {
      if (!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default customer;