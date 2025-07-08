// assets/js/load-cars.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/cars.json')
    .then(r => r.json())
    .then(cars => {
      const container = document.getElementById('car-list');
      cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3';
        card.innerHTML = `
          <div class="card h-100">
            <img src="${car.image}" class="card-img-top" alt="${car.name}">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${car.name}</h5>
              <p class="card-text mb-4">From $${car.pricePerDay}/day</p>
              <a href="booking.html?carId=${car.id}" class="btn btn-primary mt-auto">Book Now</a>
            </div>
          </div>`;
        container.appendChild(card);
      });
    })
    .catch(console.error);
});
