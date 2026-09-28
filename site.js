(function () {
  var root = document.documentElement;

  // Internal links keep the chosen language through ?lang=de. Nothing is stored.
  var internal = [].filter.call(document.querySelectorAll('a[href]'), function (a) {
    var h = a.getAttribute('href');
    return h === './' || /^[\w-]+\.html(#.*)?$/.test(h);
  });
  internal.forEach(function (a) { a.setAttribute('data-base', a.getAttribute('href')); });

  function withLang(href, lang) {
    if (lang !== 'de') return href;
    var i = href.indexOf('#');
    return i < 0 ? href + '?lang=de' : href.slice(0, i) + '?lang=de' + href.slice(i);
  }

  function setLang(lang, updateUrl) {
    root.classList.remove('lang-de', 'lang-en');
    root.classList.add('js', 'lang-' + lang);
    root.lang = lang;
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (img) {
      img.alt = img.getAttribute('data-alt-' + lang);
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    internal.forEach(function (a) { a.setAttribute('href', withLang(a.getAttribute('data-base'), lang)); });
    if (updateUrl && window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + (lang === 'de' ? '?lang=de' : '') + location.hash);
    }
  }

  setLang(root.classList.contains('lang-de') ? 'de' : 'en', false);

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });

  var viewer = document.getElementById('viewer');
  if (viewer && typeof viewer.showModal === 'function') {
    var big = viewer.querySelector('img');
    document.querySelectorAll('a.shot').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        big.src = a.getAttribute('href');
        big.alt = a.querySelector('img').alt;
        viewer.showModal();
      });
    });
    viewer.addEventListener('click', function () { viewer.close(); });
  }
})();
