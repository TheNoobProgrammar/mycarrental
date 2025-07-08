// load-customers.js
document.addEventListener('DOMContentLoaded', () => {
  // assume ?customerId=1 in the URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('carId') || params.get('customerId')) || 1;
  fetch('assets/data/customers.json')
    .then(r => r.json())
    .then(list => {
      const customer = list.find(c => c.id === id);
      const container = document.getElementById('customer-details');
      if (!customer) {
        container.innerHTML = '<p class="text-danger">Customer not found.</p>';
        return;
      }
      container.innerHTML = `
        <p><strong>Full Name:</strong> ${customer.fullName}</p>
        <p><strong>Address:</strong> ${customer.address}</p>
        <p><strong>Suburb:</strong> ${customer.suburb}</p>
        <p><strong>State:</strong> ${customer.state}</p>
        <p><strong>Postcode:</strong> ${customer.postcode}</p>
        <p><strong>Email:</strong> ${customer.email}</p>
        <p><strong>DOB:</strong> ${customer.dob}</p>
        <p><strong>Phone:</strong> ${customer.phone}</p>
      `;
    })
    .catch(console.error);
});
