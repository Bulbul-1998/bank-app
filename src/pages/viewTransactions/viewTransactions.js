import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './viewTransactions.hbs';
import css from './viewTransactions.scss';

function viewTransactions(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="kk3aw74n" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="kk3aw74n"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "kk3aw74n"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default viewTransactions;