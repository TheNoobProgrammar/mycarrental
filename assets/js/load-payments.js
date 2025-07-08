document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('payments-spinner');
  const empty   = document.getElementById('payments-empty');
  const tbody   = document.getElementById('payment-list');

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  tbody.setAttribute('aria-busy','true');

  fetch('assets/data/payments.json')
    .then(r=>r.json())
    .then(payments=>{
      spinner.classList.add('d-none');
      tbody.setAttribute('aria-busy','false');
      if(!payments.length){
        empty.textContent='No payments found.';
        empty.classList.remove('d-none');
        return;
      }
      tbody.innerHTML='';
      payments.forEach(p=>{/* render rows... */});
    })
    .catch(err=>{
      spinner.classList.add('d-none');
      tbody.setAttribute('aria-busy','false');
      empty.textContent='Failed to load payments.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});