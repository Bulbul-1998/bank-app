import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './deposit.hbs';
import css from './deposit.scss';

function deposite() {
  const html = mustache.render(template, {});
  const $page = `<div data-id="lirpdhod" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="lirpdhod"]`) || tag('style', {
    textContent: css.toString(),
    attr: {
      "data-id": "lirpdhod"
    }
  });

  return {
    render: () => {
      if (!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default deposite;