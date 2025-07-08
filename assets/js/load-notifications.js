// assets/js/load-notifications.js
document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('notification-list');

  fetch('assets/data/notifications.json')
    .then(r => r.json())
    .then(items => {
      list.innerHTML = '';
      items.forEach(n => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'list-group-item list-group-item-action' + (n.unread ? ' active' : '');
        a.innerHTML = `
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${n.title}</h5>
            <small>${new Date(n.time).toLocaleString()}</small>
          </div>
          <p class="mb-1">${n.message}</p>
        `;
        list.appendChild(a);
      });
    })
    .catch(err => {
      list.innerHTML = '<div class="text-danger p-3">Failed to load notifications.</div>';
      console.error(err);
    });
});
