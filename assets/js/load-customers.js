document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('customer-spinner');
  const empty   = document.getElementById('customer-empty');
  const container = document.getElementById('customer-details');

  spinner.classList.remove('d-none');
  empty.classList.add('d-none');
  container.setAttribute('aria-busy','true');

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('customerId')) || 1;
  fetch('assets/data/customers.json')
    .then(r => r.json())
    .then(list => {
      spinner.classList.add('d-none');
      container.setAttribute('aria-busy','false');
      const customer = list.find(c=>c.id===id);
      if(!customer){
        empty.textContent = 'Customer not found.';
        empty.classList.remove('d-none');
        return;
      }
      // existing injection logic...
      container.innerHTML = `
        <div class="card">
          <div class="card-header">Customer Detail</div>
          <div class="card-body">
            <p><strong>Full Name:</strong> ${customer.fullName}</p>
            <p><strong>Address:</strong> ${customer.address}</p>
            <p><strong>State:</strong> ${customer.state}</p>
            <p><strong>Company Name:</strong> ${customer.companyName}</p>
            <p><strong>Suburb:</strong> ${customer.suburb}</p>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>DOB:</strong> ${customer.dob}</p>
            <p><strong>Postcode:</strong> ${customer.postcode}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
          </div>
        </div>`;
    })
    .catch(err => {
      spinner.classList.add('d-none');
      container.setAttribute('aria-busy','false');
      empty.textContent = 'Failed to load customer.';
      empty.classList.remove('d-none');
      console.error(err);
    });
});