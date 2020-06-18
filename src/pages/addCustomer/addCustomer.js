import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './addCustomer.hbs';
import css from './addCustomer.scss';

function addCustomer(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="lg58j8gb" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="lg58j8gb"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "lg58j8gb"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default addCustomer;