document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('invoices-spinner');
  const empty   = document.getElementById('invoices-empty');
  const tbody   = document.getElementById('invoice-list');

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  tbody.setAttribute('aria-busy','true');

  fetch('assets/data/invoices.json')
    .then(r=>r.json())
    .then(invoices=>{
      spinner.classList.add('d-none');
      tbody.setAttribute('aria-busy','false');
      if(!invoices.length){
        empty.textContent='No invoices found.';
        empty.classList.remove('d-none');
        return;
      }
      tbody.innerHTML='';
      invoices.forEach(inv=>{/* render rows... */});
    })
    .catch(err=>{
      spinner.classList.add('d-none');
      tbody.setAttribute('aria-busy','false');
      empty.textContent='Failed to load invoices.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});