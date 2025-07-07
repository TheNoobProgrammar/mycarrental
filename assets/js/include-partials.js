// assets/js/include-partials.js
['header','footer'].forEach(id => {
  fetch(`../partials/${id}.html`)
    .then(resp => resp.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
});