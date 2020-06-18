import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './withdraw.hbs';
import css from './withdraw.scss';

function withdraw(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="l775vyho" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="l775vyho"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "l775vyho"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default withdraw;