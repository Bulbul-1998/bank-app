/**
 * 
 * @param {object} [opts] 
 * @param {boolean} [opts.enableCache] 
 */
function Router(opts = {}) {
  const routes = {};
  const cache = {};

  const enableCache = opts.enableCache;

  return {
    oldPath: '',
    onnavigate: () => {},
    /**
     * Adds new route
     * @param {string} path 
     * @param {onnavigate} callback 
     */
    add: function (path, callback) {
      routes[path] = callback;
    },
    /**
     * Nvigate to given path
     * @param {string} pathname 
     */
    navigate: function (pathname) {
      pathname = (typeof pathname === 'string' ? pathname : location.pathname);
      const hash = location.hash;

      if (this.oldPath === pathname) return;

      this.oldPath = pathname;
      if (enableCache && (pathname in cache)) {
        return (root.innerHTML = cache[pathname]);
      }

      let route = (decodeURI(pathname)).split('/');
      let query = decodeURI(location.search.substr(1));
      const params = {};
      const queries = {};
      let callback;

      for (let path in routes) {
        let match = false;

        if (!path) {
          callback = routes[path];
          break;
        }

        let navigation = path.split('/');
        for (let i = 0; i < navigation.length; ++i) {
          const nav = navigation[i];
          if (nav === '*') {
            match = true;
            break;
          } else if (nav[0] === ':' && ((!nav.endsWith('?') && !route[i]) || nav.endsWith('?'))) {
            params[nav.slice(1, -1)] = route[i];
            match = true;
            continue;
          } else if (nav === route[i]) {
            match = true;
            continue;
          } else if (nav !== route[i]) {
            match = false;
            break;
          }
        }

        if (match) {
          callback = routes[path];
          break;
        }
      }

      if (callback) {
        if (query) {
          query = query.split('&');

          query.map(get => {
            get = get.split('=');
            queries[get[0]] = get[1];
          });
        }

        callback(params, queries);
        if (hash) {
          const $el = document.getElementById(hash.slice(1));
          if ($el) $el.scrollIntoView();
        }
      }
    },
    listen: function () {
      this.navigate(location.pathname);
      document.addEventListener('locationchange', this.navigate);
      document.body.addEventListener('click', listenForAncher);
      window.addEventListener('popstate', listenPopState);

      /**
       * 
       * @param {MouseEvent} e 
       */
      function listenForAncher(e) {

        const $el = e.target;

        if (!($el instanceof HTMLAnchorElement) || $el.hasAttribute("ignore-routing")) return;

        /**
         * @type {string}
         */
        const href = $el.getAttribute('href');
        const thisSite = new RegExp(`(^https?:\/\/(www\.)?${location.hostname}(\/\.*)?)|(^\/)`);

        if (!thisSite.test(href)) return;

        e.preventDefault();

        if (enableCache) cache[location.pathname] = root.innerHTML;

        if (href !== location.pathname) history.pushState(history.state, document.title, href);
        document.dispatchEvent(new CustomEvent('locationchange'));

        if (this.onnavigate) this.onnavigate(href);
      }

      function listenPopState() {
        const path = location.pathname;
        document.dispatchEvent(new CustomEvent('locationchange'));

        if (this.onnavigate) this.onnavigate(path);
      }
    }
  };
}

export default Router;

/**
 * This callback is called on navigation to this route
 * @callback onnavigate
 * @param {object} params
 * @param {object} queries
 */