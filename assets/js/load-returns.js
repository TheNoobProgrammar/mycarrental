document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('returns-spinner');
  const empty   = document.getElementById('returns-empty');
  const list    = document.getElementById('return-list');
  const params  = new URLSearchParams(window.location.search);
  const custId  = parseInt(params.get('customerId')) || 1;

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  list.setAttribute('aria-busy','true');

  fetch('assets/data/returns.json')
    .then(r=>r.json())
    .then(events=>{
      spinner.classList.add('d-none');
      list.setAttribute('aria-busy','false');
      const custEvents = events.filter(e=>e.customerId===custId);
      if(!custEvents.length){
        empty.textContent='No pickup/return history.';
        empty.classList.remove('d-none');
        return;
      }
      list.innerHTML='';
      custEvents.forEach(e=>{/* render list-group item */});
    })
    .catch(err=>{
      spinner.classList.add('d-none');
      list.setAttribute('aria-busy','false');
      empty.textContent='Failed to load history.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});
