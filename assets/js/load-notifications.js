document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('notifications-spinner');
  const empty   = document.getElementById('notifications-empty');
  const list    = document.getElementById('notification-list');

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  list.setAttribute('aria-busy','true');

  fetch('assets/data/notifications.json')
    .then(r=>r.json())
    .then(items=>{
      spinner.classList.add('d-none');
      list.setAttribute('aria-busy','false');
      if(!items.length){
        empty.textContent='No notifications.';
        empty.classList.remove('d-none');
        return;
      }
      list.innerHTML='';
      items.forEach(n=>{/* render items... */});
    })
    .catch(err=>{
      spinner.classList.add('d-none');
      list.setAttribute('aria-busy','false');
      empty.textContent='Failed to load notifications.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});