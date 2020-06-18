import mustache from 'mustache';
import tag from 'html-tag-js';
import ajax from '@deadlyjack/ajax';

import template from './home.hbs';
import css from './home.scss';
import dialogbox from '../../components/dialogbox/dialogbox';

function home() {
  const html = mustache.render(template, {});
  const $page = `<div data-id="lht5p1r6" className="page">${html}</div>`;

  const root = window.app || document.body;
  const $style = tag.get(`style[data-id="lht5p1r6"]`) || tag('style', {
    textContent: css.toString(),
    attr: {
      "data-id": "lht5p1r6"
    }
  });
  const auth = gapi.auth2.init({
    client_id: "256737953748-t2nijs1hlh3j4n9ro04cvk5vtohspslt.apps.googleusercontent.com"
  });

  const googleSignin = {
    onsuccess: res => {
      const $typeCustomer = tag.get("#loginTypeCustomer");
      const email = res.getBasicProfile().getEmail();
      const extra = res.getAuthResponse();
      login({
        email,
        extra,
        mode: "google",
        userType: $typeCustomer.checked ? "customer" : "employee"
      });
    },
    onerror: showError
  };

  return {
    render: () => {
      if (!$style.isConnected) document.head.append($style);
      root.innerHTML = $page;

      const $signinWithGoogle = tag.get("#signinWithGoogle");
      const $login = tag.get("#login");

      auth.attachClickHandler(
        $signinWithGoogle, {},
        googleSignin.onsuccess,
        googleSignin.onsuccess
      );

      $login.onclick = normalLogin;
    }
  };

  function normalLogin() {
    const $email = tag.get("#email");
    const $password = tag.get("#password");
    const $typeCustomer = tag.get("#loginTypeCustomer");

    const userType = $typeCustomer.checked ? "customer" : "employee";
    const email = $email.value;
    const password = $password.value;

    if (!email) return setError($email);
    else if (!password) return setError($password);

    const data = {
      email,
      password,
      mode: "simple",
      userType
    };

    login(data);
  }
}

/**
 * Add a warning message below the input
 * @param {HTMLElement} $el 
 */
function setError($el) {
  if (!$el.parentElement) return;

  $el.parentElement.classList.add("required");
  $el.onfocus = function () {
    this.parentElement.classList.remove("required");
    this.onfocus = null;
  };
}

/**
 * This methods sends requests to server (backend) and reacts to resonse. If request was
 * successful, then it redirects to home of userType i.e. if userType is employee it referes it
 * employee page else customer page.
 * @param {object} data request payload
 */
function login(data) {
  const $loadingBox = dialogbox({
    loader: true,
    message: "Signing in..."
  });
  root.append($loadingBox);
  const userType = data.userType;

  ajax({
      url: `/api/${userType}?email=${encodeURI(data.email)}`,
      responseType: "json",
      response: true
    })
    .then(res => {
      sessionStorage.setItem("loginDetails", JSON.stringify({
        userType,
        user: res
      }));
      const $dialogBox = dialogbox({
        title: "INFO",
        message: "Login successfull",
        buttons: [{
          id: "dialogboxOkButton",
          text: "OK"
        }],
        oninteract: function (e) {
          if (e.target.id === "dialogboxOkButton") {
            location.href = "/" + userType;
            this.remove();
          }
        }
      });
      root.append($dialogBox);
    })
    .catch(showError)
    .finally(() => {
      $loadingBox.remove();
    });
}

/**
 * Pop up dialog with error message.
 * @param {string} err 
 */
function showError(err) {
  console.error(err);
  if (err === null) err = "";
  const error = err.message || "Cannot process request, please try again later!";
  const $dialogBox = dialogbox({
    title: "ERROR",
    message: error,
    buttons: [{
      id: "dialogboxOkButton",
      text: "OK"
    }],
    oninteract: function (e) {
      if (e.target.id === "dialogboxOkButton") {
        this.remove();
      }
    }
  });
  root.append($dialogBox);
}

export default home;