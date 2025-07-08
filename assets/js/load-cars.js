// assets/js/load-cars.js
// Enhanced loader for cars with spinner and empty-state handling

document.addEventListener('DOMContentLoaded', () => {
  const spinner = document.getElementById('cars-spinner');
  const emptyMsg = document.getElementById('cars-empty');
  const listEl = document.getElementById('car-list');

  // Initially show spinner, hide empty message, mark busy
  spinner.classList.remove('d-none');
  emptyMsg.classList.add('d-none');
  listEl.setAttribute('aria-busy', 'true');

  // Fetch car data
  fetch('assets/data/cars.json')
    .then(response => response.json())
    .then(cars => {
      // Hide spinner and clear busy flag
      spinner.classList.add('d-none');
      listEl.setAttribute('aria-busy', 'false');

      // If no cars, show empty message
      if (!cars.length) {
        emptyMsg.textContent = 'No cars available.';
        emptyMsg.classList.remove('d-none');
        return;
      }

      // Otherwise, render the car cards
      renderCars(cars);
    })
    .catch(error => {
      console.error('Error loading cars:', error);
      // Hide spinner and clear busy flag
      spinner.classList.add('d-none');
      listEl.setAttribute('aria-busy', 'false');
      // Show error in empty message
      emptyMsg.textContent = 'Failed to load cars.';
      emptyMsg.classList.remove('d-none');
    });

  // Render function (same as before)
  function renderCars(data) {
    listEl.innerHTML = '';
    data.forEach(car => {
      const col = document.createElement('div');
      col.className = 'col-sm-6 col-md-4 col-lg-3';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${car.image}" class="card-img-top" alt="${car.name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${car.name}</h5>
            <p class="card-text mb-4">From $${car.pricePerDay}/day</p>
            <a href="booking.html?carId=${car.id}" class="btn btn-primary mt-auto">Book Now</a>
          </div>
        </div>`;
      listEl.appendChild(col);
    });
  }
});
