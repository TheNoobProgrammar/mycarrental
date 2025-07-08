document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('agreements-spinner');
  const empty   = document.getElementById('agreements-empty');
  const container = document.getElementById('agreement-container');
  const params = new URLSearchParams(window.location.search);
  const rentalId = parseInt(params.get('rentalId')) || 1;

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  container.setAttribute('aria-busy','true');

  fetch('assets/data/agreements.json')
    .then(r=>r.json())
    .then(list=>{
      spinner.classList.add('d-none');
      container.setAttribute('aria-busy','false');
      const agr = list.find(a=>a.rentalId===rentalId);
      if(!agr){
        empty.textContent='Agreement not found.';
        empty.classList.remove('d-none');
        return;
      }
      container.innerHTML = `
        <div class="card">
          <div class="card-header">Agreement #${agr.agreementNo}</div>
          <div class="card-body">
            <p><strong>Date Issued:</strong> ${agr.dateIssued}</p>
            <p><strong>Terms:</strong> ${agr.terms}</p>
            <p><strong>Signed:</strong> ${agr.signed ? '<span class="text-success">Yes</span>' : '<span class="text-warning">No</span>'}</p>
          </div>
        </div>`;
    })
    .catch(err=>{
      spinner.classList.add('d-none');
      container.setAttribute('aria-busy','false');
      empty.textContent='Failed to load agreement.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});