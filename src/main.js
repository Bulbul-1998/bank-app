import tag from 'html-tag-js';
import mustache from 'mustache';
import css from './main.scss';
import template from './main.hbs';
import Router from './lib/Router';
import home from './pages/home/home';
import customer from './pages/customer/customer';
import employee from './pages/employee/employee';
import addCustomer from './pages/addCustomer/addCustomer';
import deposit from './pages/deposit/deposit';
import withdraw from './pages/withdraw/withdraw';
import viewBalance from './pages/viewBalance/viewBalance';
import fundTransfer from './pages/fundTransfer/fundTransfer';
import viewTransactions from './pages/viewTransactions/viewTransactions';
import openAccount from './pages/openAccount/openAccount';
import closeAccount from './pages/closeAccount/closeAccount';
import viewCustomer from './pages/viewCustomer/viewCustomer';

window.onload = main;

function main() {
  const router = Router();
  loadApp();

  router.add('/', () => {
    const loginDetails = sessionStorage.getItem("loginDetails");
    if (loginDetails) {
      const loginData = JSON.parse(loginDetails);
      const userTYpe = loginData.userType;
      location.href = `/${userTYpe}`;
    } else {
      home().render();
    }
  });

  router.add('/employee', () => {
    employee().render();
  });
  router.add('/employee/add-customer', () => {
    addCustomer().render();
  });
  router.add('/employee/open-account', () => {
    openAccount().render();
  });
  router.add('/employee/close-account', () => {
    closeAccount().render();
  });
  router.add('/employee/view-cusotmer', () => {
    viewCustomer().render();
  });

  router.add('/customer', () => {
    customer().render();
  });
  router.add('/customer/deposit', () => {
    deposit().render();
  });
  router.add('/customer/withdraw', () => {
    withdraw().render();
  });
  router.add('/customer/view-balance', () => {
    viewBalance().render();
  });
  router.add('/customer/fund-transfer', () => {
    fundTransfer().render();
  });
  router.add('/customer/view-transaction', () => {
    viewTransactions().render();
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