import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './fundTransfer.hbs';
import css from './fundTransfer.scss';

function fundTransfer(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="ksxuract" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="ksxuract"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "ksxuract"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default fundTransfer;