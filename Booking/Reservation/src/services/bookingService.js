// src/services/bookingService.js

const BOOKINGS_KEY = 'bookings';
const SIMULATED_DELAY = 500; // 0.5 seconds

// --- Private Helper Functions ---

const getStoredBookings = () => {
    const bookings = localStorage.getItem(BOOKINGS_KEY);
    return bookings ? JSON.parse(bookings) : [];
};

const setStoredBookings = (bookings) => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

// --- Public API Functions ---

/**
 * @description Fetches all bookings from the database.
 * @returns {Promise<Array>} A promise that resolves to the array of bookings.
 */
export const fetchBookings = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const bookings = getStoredBookings();
            resolve(bookings);
        }, SIMULATED_DELAY);
    });
};

/**
 * @description Adds a new booking to the database.
 * @param {object} bookingData - The data for the new booking.
 * @returns {Promise<object>} A promise that resolves to the newly created booking object.
 */
export const addBooking = (bookingData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const bookings = getStoredBookings();
            const newBooking = {
                id: Date.now(), // Unique ID from timestamp
                ...bookingData,
            };
            const updatedBookings = [...bookings, newBooking];
            setStoredBookings(updatedBookings);
            resolve(newBooking);
        }, SIMULATED_DELAY);
    });
};

/**
 * @description Deletes a booking from the database by its ID.
 * @param {number} bookingId - The ID of the booking to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deletion was successful.
 */
export const deleteBooking = (bookingId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let bookings = getStoredBookings();
            const updatedBookings = bookings.filter(b => b.id !== bookingId);
            setStoredBookings(updatedBookings);
            resolve(true); // Indicate success
        }, SIMULATED_DELAY);
    });
};