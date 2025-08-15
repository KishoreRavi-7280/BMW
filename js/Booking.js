// Booking Form Auto-Fill
const bookButtons = document.querySelectorAll(".bmw-book-btn");
const carModelInput = document.querySelector("#bmwCarModel");

bookButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const carName = btn.parentElement.querySelector("h3").textContent;
        carModelInput.value = carName;
        document.querySelector("#bmwName").focus();
        window.scrollTo({ top: document.querySelector(".bmw-booking-form").offsetTop - 50, behavior: 'smooth' });
    });
});

// Save Booking to Local Storage
document.querySelector("#bmwForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const bookingData = {
        carModel: carModelInput.value,
        name: document.querySelector("#bmwName").value,
        email: document.querySelector("#bmwEmail").value,
        pickupDate: document.querySelector("#bmwPickup").value,
        dropoffDate: document.querySelector("#bmwDropoff").value
    };

    let bookings = JSON.parse(localStorage.getItem("bmwBookings")) || [];
    bookings.push(bookingData);
    localStorage.setItem("bmwBookings", JSON.stringify(bookings));

    alert("Your BMW booking is confirmed!");
    e.target.reset();
});
