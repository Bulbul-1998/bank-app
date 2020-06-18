import mustache from 'mustache';
import tag from 'html-tag-js';

import template from './employee.hbs';
import css from './employee.scss';

function employee(){
  const html = mustache.render(template, {});
  const $page = `<div data-id="l581bqsv" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="l581bqsv"]`) || tag('style', {
    textContent: css.toString(),
    attr:{
      "data-id": "l581bqsv"
    }
  });

  return {
    render: ()=>{
      if(!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;
    }
  };
}

export default employee;