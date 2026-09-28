(function () {
  var root = document.documentElement;

  function setLang(lang) {
    root.classList.remove('lang-de', 'lang-en');
    root.classList.add('js', 'lang-' + lang);
    root.lang = lang;
    document.querySelectorAll('[data-alt-' + lang + ']').forEach(function (img) {
      img.alt = img.getAttribute('data-alt-' + lang);
    });
    document.querySelectorAll('.langs button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  setLang(root.classList.contains('lang-de') ? 'de' : 'en');

  document.querySelectorAll('.langs button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
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
