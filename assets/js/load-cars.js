// assets/js/load-cars.js
document.addEventListener('DOMContentLoaded', () => {
  let cars = [];                            // will hold all fetched cars
  const listEl    = document.getElementById('car-list');
  const filterEl  = document.getElementById('filter-category');
  const sortEl    = document.getElementById('sort-by');

  // Render a given array of cars into the grid
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

  // Apply current filter & sort settings, then render
  function applyFiltersAndSort() {
    let result = [...cars];

    // 1. Filter by category
    const category = filterEl.value;
    if (category !== 'all') {
      result = result.filter(c => c.category === category);
    }

    // 2. Sort
    const sortBy = sortEl.value;
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }
    // if you later add an 'availability' property, you can handle it here

    renderCars(result);
  }

  // Fetch data and initialize
  fetch('assets/data/cars.json')
    .then(res => res.json())
    .then(data => {
      cars = data;
      applyFiltersAndSort();
    })
    .catch(console.error);

  // Re-apply when user changes filter or sort
  filterEl.addEventListener('change', applyFiltersAndSort);
  sortEl.addEventListener('change',   applyFiltersAndSort);
});
