import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './openAccount.hbs';
import css from './openAccount.scss';

function openAccount(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="ljzqt6pg" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="ljzqt6pg"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "ljzqt6pg"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default openAccount;