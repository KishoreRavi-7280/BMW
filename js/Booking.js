 const MODEL_MAP = {
      'bmw-m': [
        'M2 Coupé', 'M3 Sedan', 'M4 Coupé', 'M4 Convertible', 'M5 Sedan', 'M8 Coupé', 'M8 Gran Coupé', 'M8 Convertible', 'X3 M', 'X4 M', 'X5 M', 'X6 M'
      ],
      'bmw-x': [
        'X1', 'X3', 'X4', 'X5', 'X6', 'X7', 'XM'
      ]
    };

    const form = document.getElementById('bookingForm');
    const brandEl = document.getElementById('brand');
    const modelEl = document.getElementById('model');
    const receiptEl = document.getElementById('receipt');
    const statusStamp = document.getElementById('statusStamp');
    const toast = document.getElementById('toast');
    const printBtn = document.getElementById('printBtn');
    const viewAllBtn = document.getElementById('viewAllBtn');

    // ===== Load models dynamically =====
    brandEl.addEventListener('change', () => {
      const key = brandEl.value;
      modelEl.innerHTML = '<option value="" disabled selected>Select model</option>';
      (MODEL_MAP[key] || []).forEach(m => {
        const opt = document.createElement('option'); opt.value = m; opt.textContent = m; modelEl.appendChild(opt);
      });
      modelEl.focus();
    });

    // ===== Helper: Toast =====
    function showToast(msg) {
      toast.style.display = 'grid';
      toast.innerHTML = `<div class="toast__item">${msg}</div>`;
      setTimeout(() => { toast.style.display = 'none'; toast.innerHTML = ''; }, 2400);
    }

    // ===== Helper: Storage =====
    const STORAGE_KEY = 'bmwBookings';
    function loadBookings() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; }
    }
    function saveBookings(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

    // ===== Formatters =====
    const fmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    function formatReceipt(b) {
      return (
`Booking ID : ${b.id}
Name       : ${b.name}
Contact    : ${b.contact}
Brand      : ${b.brandLabel}
Model      : ${b.model}
Pick-up    : ${fmt.format(new Date(b.pickupDate))}
Drop-off   : ${fmt.format(new Date(b.dropoffDate))}
Pickup Loc : ${b.pickupLocation}
Dropoff Loc: ${b.dropoffLocation}
Created At : ${fmt.format(new Date(b.createdAt))}
`);
    }

    function updateSummary(latest) {
      if (!latest) { receiptEl.textContent = 'No booking yet.'; statusStamp.textContent = '—'; return; }
      receiptEl.textContent = formatReceipt(latest);
      statusStamp.textContent = 'Confirmed';
    }

    // ===== Form submit =====
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        showToast('Please fill all required fields correctly.');
        form.reportValidity();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      // Guard: Only allow BMW M & X (already enforced by UI)
      if (!['bmw-m','bmw-x'].includes(data.brand)) {
        showToast('Only BMW M & X series are available.');
        return;
      }

      const bookings = loadBookings();
      const booking = {
        id: 'BMW-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        name: data.name.trim(),
        contact: data.contact.trim(),
        brand: data.brand,
        brandLabel: data.brand === 'bmw-m' ? 'BMW M Series' : 'BMW X Series',
        model: data.model,
        pickupDate: data.pickupDate,
        dropoffDate: data.dropoffDate,
        pickupLocation: data.pickupLocation.trim(),
        dropoffLocation: data.dropoffLocation.trim(),
        createdAt: new Date().toISOString()
      };

      bookings.push(booking);
      saveBookings(bookings);

      // Confirmation animation
      statusStamp.textContent = 'Processing…';
      setTimeout(() => {
        updateSummary(booking);
        statusStamp.textContent = 'Confirmed';
        showToast('✅ Booking saved locally.');
        form.reset();
        // Reset model placeholder after form reset
        modelEl.innerHTML = '<option value="" disabled selected>Select model</option>';
      }, 450);
    });

    // ===== Print latest =====
    printBtn.addEventListener('click', () => {
      const list = loadBookings();
      if (!list.length) { showToast('No booking to print yet.'); return; }
      updateSummary(list[list.length - 1]);
      setTimeout(() => window.print(), 50);
    });

    // ===== View All (simple alert) =====
    viewAllBtn.addEventListener('click', () => {
      const list = loadBookings();
      if (!list.length) { showToast('No saved bookings yet.'); return; }
      const lines = list.map(b => `${b.id} — ${b.brandLabel} ${b.model} (${fmt.format(new Date(b.pickupDate))} → ${fmt.format(new Date(b.dropoffDate))})`).join('\n');
      alert('Saved bookings:\n\n' + lines);
    });

    // ===== Prefill min dates =====
    function setMinDateTimes() {
      const now = new Date();
      const pad = n => String(n).padStart(2, '0');
      const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
      const isoLocal = local.toISOString().slice(0,16);
      document.getElementById('pickupDate').min = isoLocal;
      document.getElementById('dropoffDate').min = isoLocal;
    }
    setMinDateTimes();