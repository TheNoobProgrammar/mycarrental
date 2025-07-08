document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('rentals-spinner');
  const empty   = document.getElementById('rentals-empty');
  const tbody   = document.getElementById('rental-vehicle-list');

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  tbody.setAttribute('aria-busy','true');

  Promise.all([
    fetch('assets/data/rental-vehicles.json').then(r=>r.json()),
    fetch('assets/data/cars.json').then(r=>r.json())
  ])
  .then(([rentals,cars])=>{
    spinner.classList.add('d-none');
    tbody.setAttribute('aria-busy','false');
    if(!rentals.length){
      empty.textContent='No rentals found.';
      empty.classList.remove('d-none');
      return;
    }
    tbody.innerHTML='';
    rentals.forEach(r=>{/* render rows... */});
  })
  .catch(err=>{
    spinner.classList.add('d-none');
    tbody.setAttribute('aria-busy','false');
    empty.textContent='Failed to load rentals.';
    empty.classList.remove('d-none');
    console.error(err);
  });
});
