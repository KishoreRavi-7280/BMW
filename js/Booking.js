// =============================================================================
// CAR DATA UTILITIES
// =============================================================================

const carData = {
  'BMW': ['1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'i3', 'i4', 'iX', 'M2', 'M3', 'M4', 'M5', 'M8']
};

function getCarBrands() {
  try {
    return Object.keys(carData).sort();
  } catch (error) {
    console.error('Error getting car brands:', error);
    return [];
  }
}

function getModelsByBrand(brand) {
  try {
    return carData[brand] || [];
  } catch (error) {
    console.error('Error getting models by brand:', error);
    return [];
  }
}

function getAllCars() {
  try {
    const allCars = [];
    Object.keys(carData).forEach(brand => {
      carData[brand].forEach(model => {
        allCars.push({ brand, model });
      });
    });
    return allCars;
  } catch (error) {
    console.error('Error getting all cars:', error);
    return [];
  }
}

// =============================================================================
// STORAGE UTILITIES
// =============================================================================

function generateBookingId() {
  try {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `BK${timestamp}${random}`;
  } catch (error) {
    console.error('Error generating booking ID:', error);
    return `BK${Date.now()}`;
  }
}

function saveBooking(bookingData) {
  try {
    const bookingId = generateBookingId();
    const booking = {
      ...bookingData,
      bookingId,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const existingBookings = getBookings();
    existingBookings.push(booking);
    localStorage.setItem('carBookings', JSON.stringify(existingBookings));
    
    console.log('Booking saved successfully:', booking);
    return bookingId;
  } catch (error) {
    console.error('Error saving booking:', error);
    return null;
  }
}

function getBookings() {
  try {
    const bookings = localStorage.getItem('carBookings');
    return bookings ? JSON.parse(bookings) : [];
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
}

// =============================================================================
// BOOKING FORM COMPONENT
// =============================================================================

let formState = {
  brand: 'BMW',
  model: '',
  pickupDate: '',
  pickupTime: '',
  dropoffDate: '',
  dropoffTime: '',
  pickupLocation: '',
  dropoffLocation: ''
};

let isSubmitting = false;

function createBookingForm(container) {
  try {
    const formHTML = `
      <form id="booking-form" class="booking-form" data-name="booking-form" data-file="app.js">
        <h2>Reserve Your Vehicle</h2>
        
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">BMW Series</label>
            <select name="brand" id="brand-select" class="form-select" required>
              <option value="BMW">BMW</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">BMW Model</label>
            <select name="model" id="model-select" class="form-select" required>
              <option value="">Select a BMW model</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Pickup Date</label>
            <input type="date" name="pickupDate" id="pickup-date" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Pickup Time</label>
            <input type="time" name="pickupTime" id="pickup-time" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Drop-off Date</label>
            <input type="date" name="dropoffDate" id="dropoff-date" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Drop-off Time</label>
            <input type="time" name="dropoffTime" id="dropoff-time" class="form-input" required />
          </div>

          <div class="form-group">
            <label class="form-label">Pickup Location</label>
            <input type="text" name="pickupLocation" id="pickup-location" class="form-input" placeholder="Enter pickup address" required />
          </div>

          <div class="form-group">
            <label class="form-label">Drop-off Location</label>
            <input type="text" name="dropoffLocation" id="dropoff-location" class="form-input" placeholder="Enter drop-off address" required />
          </div>
        </div>

        <button type="submit" id="submit-btn" class="submit-btn glow-animation">
          Book Now
        </button>
      </form>
    `;

    container.innerHTML = formHTML;
    initializeFormEvents();
    populateCarBrands();
    setMinDates();
  } catch (error) {
    console.error('Error creating booking form:', error);
  }
}

function initializeFormEvents() {
  const form = document.getElementById('booking-form');
  const brandSelect = document.getElementById('brand-select');
  const pickupDateInput = document.getElementById('pickup-date');

  brandSelect.addEventListener('change', handleBrandChange);
  pickupDateInput.addEventListener('change', updateDropoffMinDate);
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', handleInputChange);
}

function handleBrandChange(e) {
  const brand = e.target.value;
  formState.brand = brand;
  formState.model = '';
  
  const modelSelect = document.getElementById('model-select');
  modelSelect.innerHTML = '<option value="">Select a BMW model</option>';
  
  if (brand) {
    const models = getModelsByBrand(brand);
    models.forEach(model => {
      const option = document.createElement('option');
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
    modelSelect.disabled = false;
  } else {
    modelSelect.disabled = true;
  }
}

function handleInputChange(e) {
  const { name, value } = e.target;
  formState[name] = value;
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  if (isSubmitting) return;
  
  try {
    isSubmitting = true;
    updateSubmitButton(true);

    const isValid = Object.values(formState).every(value => value.trim() !== '');
    
    if (!isValid) {
      alert('Please fill in all fields');
      return;
    }

    const bookingId = saveBooking(formState);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    handleBookingSubmit({ ...formState, bookingId });
    resetForm();
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred while processing your booking. Please try again.');
  } finally {
    isSubmitting = false;
    updateSubmitButton(false);
  }
}

function updateSubmitButton(submitting) {
  const submitBtn = document.getElementById('submit-btn');
  if (submitting) {
    submitBtn.textContent = 'Processing...';
    submitBtn.classList.remove('glow-animation');
    submitBtn.disabled = true;
  } else {
    submitBtn.textContent = 'Book Now';
    submitBtn.classList.add('glow-animation');
    submitBtn.disabled = false;
  }
}

function populateCarBrands() {
  const brandSelect = document.getElementById('brand-select');
  const modelSelect = document.getElementById('model-select');
  
  brandSelect.value = 'BMW';
  formState.brand = 'BMW';
  
  const models = getModelsByBrand('BMW');
  models.forEach(model => {
    const option = document.createElement('option');
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
  
  modelSelect.disabled = false;
}

function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('pickup-date').min = today;
  document.getElementById('dropoff-date').min = today;
}

function updateDropoffMinDate() {
  const pickupDate = document.getElementById('pickup-date').value;
  const dropoffDateInput = document.getElementById('dropoff-date');
  
  if (pickupDate) {
    dropoffDateInput.min = pickupDate;
  }
}

function resetForm() {
  formState = {
    brand: 'BMW',
    model: '',
    pickupDate: '',
    pickupTime: '',
    dropoffDate: '',
    dropoffTime: '',
    pickupLocation: '',
    dropoffLocation: ''
  };
  
  document.getElementById('booking-form').reset();
  populateCarBrands();
  setMinDates();
}

// =============================================================================
// CONFIRMATION MODAL COMPONENT
// =============================================================================

function showConfirmationModal(bookingData) {
  try {
    if (!bookingData) return;

    const modal = document.getElementById('confirmation-modal');
    const modalHTML = `
      <div class="confirmation-content" data-name="confirmation-modal" data-file="app.js">
        <div class="modal-icon">
          <div class="icon-check" style="font-size: 2rem; color: white;"></div>
        </div>
        <h3 class="modal-title">Booking Confirmed!</h3>
        <p class="modal-subtitle">Your reservation has been successfully processed.</p>

        <div class="booking-details">
          <h4>Booking Details:</h4>
          <div class="detail-row">
            <span class="detail-label">Booking ID:</span>
            <span class="detail-value">${bookingData.bookingId}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Vehicle:</span>
            <span class="detail-value">${bookingData.brand} ${bookingData.model}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pickup:</span>
            <span class="detail-value">${bookingData.pickupDate} at ${bookingData.pickupTime}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Drop-off:</span>
            <span class="detail-value">${bookingData.dropoffDate} at ${bookingData.dropoffTime}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">From:</span>
            <span class="detail-value">${bookingData.pickupLocation}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">To:</span>
            <span class="detail-value">${bookingData.dropoffLocation}</span>
          </div>
        </div>

        <div class="modal-buttons">
          <button id="close-modal-btn" class="modal-btn modal-btn-secondary">
            Close
          </button>
          <button id="print-receipt-btn" class="modal-btn modal-btn-primary">
            Print Receipt
          </button>
        </div>
      </div>
    `;

    modal.innerHTML = modalHTML;
    modal.classList.remove('hidden');

    document.getElementById('close-modal-btn').addEventListener('click', closeConfirmation);
    document.getElementById('print-receipt-btn').addEventListener('click', () => window.print());
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeConfirmation();
      }
    });

  } catch (error) {
    console.error('Error showing confirmation modal:', error);
  }
}

function hideConfirmationModal() {
  try {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.add('hidden');
    modal.innerHTML = '';
  } catch (error) {
    console.error('Error hiding confirmation modal:', error);
  }
}

// =============================================================================
// MAIN APPLICATION
// =============================================================================

let appState = {
  showConfirmation: false,
  bookingData: null
};

function initializeApp() {
  try {
    const formContainer = document.getElementById('booking-form-container');
    if (formContainer) {
      createBookingForm(formContainer);
    }

    window.addEventListener('error', (error) => {
      console.error('Global error:', error);
    });

    console.log('BMW car booking app initialized successfully');
  } catch (error) {
    console.error('App initialization error:', error);
  }
}

function handleBookingSubmit(data) {
  try {
    appState.bookingData = data;
    appState.showConfirmation = true;
    
    showConfirmationModal(data);
    
    setTimeout(() => {
      closeConfirmation();
    }, 5000);
  } catch (error) {
    console.error('Error handling booking submission:', error);
  }
}

function closeConfirmation() {
  try {
    appState.showConfirmation = false;
    hideConfirmationModal();
  } catch (error) {
    console.error('Error closing confirmation:', error);
  }
}

document.addEventListener('DOMContentLoaded', initializeApp);