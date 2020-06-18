import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './closeAccount.hbs';
import css from './closeAccount.scss';

function closeAccount(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="l95qoy35" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="l95qoy35"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "l95qoy35"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default closeAccount;