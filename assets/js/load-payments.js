// assets/js/load-payments.js
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('payment-list');

  fetch('assets/data/payments.json')
    .then(r => r.json())
    .then(payments => {
      tbody.innerHTML = '';
      payments.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <th scope="row">${p.id}</th>
          <td>${p.method}</td>
          <td>${p.date}</td>
          <td>$${p.amount.toFixed(2)}</td>
          <td><span class="badge bg-success">${p.status}</span></td>
          <td><a href="#" class="text-danger"><i class="fas fa-trash-alt"></i></a></td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      tbody.innerHTML = '<tr><td colspan="6" class="text-danger">Failed to load payments.</td></tr>';
      console.error(err);
    });
});
