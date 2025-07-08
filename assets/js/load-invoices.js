// load-invoices.js
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('invoice-list');

  fetch('assets/data/invoices.json')
    .then(r => r.json())
    .then(invoices => {
      tbody.innerHTML = '';
      invoices.forEach(inv => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <th scope="row">${inv.id}</th>
          <td>${inv.invoiceNo}</td>
          <td>${inv.date}</td>
          <td>$${inv.amount.toFixed(2)}</td>
          <td>
            <span class="badge bg-${inv.status === 'Paid' ? 'success' : 'warning'} 
                          ${inv.status === 'Pending' ? 'text-dark' : ''}">
              ${inv.status}
            </span>
          </td>
          <td>
            <a href="${inv.file}" download class="text-decoration-none">
              <i class="fas fa-file-pdf fa-lg text-danger"></i>
            </a>
          </td>`;
        tbody.appendChild(tr);
      });
    })
    .catch(err => {
      tbody.innerHTML = `<tr><td colspan="6" class="text-danger">Failed to load invoices.</td></tr>`;
      console.error(err);
    });
});
