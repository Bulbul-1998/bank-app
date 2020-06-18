import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './viewCustomer.hbs';
import css from './viewCustomer.scss';

function viewCustomer(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="kn23skkw" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="kn23skkw"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "kn23skkw"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default viewCustomer;