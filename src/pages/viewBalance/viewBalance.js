import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './viewBalance.hbs';
import css from './viewBalance.scss';

function viewBalance(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="kojxa2qp" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="kojxa2qp"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "kojxa2qp"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default viewBalance;