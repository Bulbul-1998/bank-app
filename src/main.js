import tag from 'html-tag-js';
import mustache from 'mustache';
import css from './main.scss';
import template from './main.hbs';
import Router from './lib/Router';
import home from './pages/home/home';
import customer from './pages/customer/customer';
import employee from './pages/employee/employee';
import addCustomer from './pages/addCustomer/addCustomer';

window.onload = main;

function main() {
  const router = Router();
  loadApp();

  router.add('/', () => {
    home().render();
  });
  router.add('/employee/add-customer', () => {
    addCustomer().render();
  });
  router.add('/employee', () => {
    employee().render();
  });
  router.add('/customer', () => {
    customer().render();
  });
  router.add('*', () => {
    alert("Cannot get " + location.pathname);
  });
  router.listen();

  function loadApp() {
    const AppName = 'Bank App';
    app.innerHTML = mustache.render(template, {
      "app-name": AppName
    });
    window.app = tag.get('#root');
    const $style = tag('style', {
      textContent: css.toString()
    });
    document.head.append($style);
  }
}